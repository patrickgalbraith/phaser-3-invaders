import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'
import PhaserEntity from '../Entities/PhaserEntity'
import PrimaryWeapon from '../Components/PrimaryWeapon'
import Weapon from '../Components/Weapon'
import createProjectile from '../Assemblages/Projectile'

export default class PlayerManager implements ISystem {
  private readonly flameUpdateDelay = 100
  private playerShip: PhaserEntity<Phaser.Physics.Arcade.Sprite>
  private frame = [0, 2]
  private lastFlameUpdate = -999999
  private lastFiredGun = -999999
  private cursors: any
  private shootButton: any
  private createProjectile = createProjectile(null)

  constructor (private readonly scene: Phaser.Scene) {
    this.createProjectile = createProjectile(scene)
  }

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
    this.playerShip = entities.find(e => e.id == 'player-ship') as PhaserEntity<Phaser.Physics.Arcade.Sprite>

    this.playerShip.getGameObject().setPosition(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height - 20)

    this.resize(entities, this.scene.sys.canvas.width, this.scene.sys.canvas.height)

    this.cursors     = this.scene.input.keyboard.createCursorKeys()
    this.shootButton = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  resize (entities: IEntity[], width: number, height: number, data?: object) {
    const gameObject = this.playerShip.getGameObject()

    gameObject.setPosition(gameObject.x, height - 20)
  }

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {
    let frameChanged = false
    const gameObject = this.playerShip.getGameObject()
    const velocityX  = gameObject.body.velocity.x

    // Move using cursor keys
    if (this.cursors.left.isDown) {
      gameObject.setAccelerationX(-1200)
    } else if(this.cursors.right.isDown) {
      gameObject.setAccelerationX(1200)
    } else {
      gameObject.setAccelerationX(0)
    }

    // Slight left
    if (velocityX > -300 && velocityX < 2) {
      this.frame[1] = 1

    // Hard left
    } else if(velocityX < 2) {
      this.frame[1] = 0

    // Slight right
    } else if(velocityX < 300 && velocityX > 2) {
      this.frame[1] = 3

    // Hard right
    } else if(velocityX > 2) {
      this.frame[1] = 4

    // Back to center
    } else {
      this.frame[1] = 2
    }

    // Shoot weapon
    if (this.shootButton.isDown) {
      const weapon = this.playerShip.getComponentType(PrimaryWeapon)

      if (timestep - this.lastFiredGun > weapon.rate) {
        const projectileYOffset = -10
        entities.push(this.createProjectile(weapon, gameObject.x + 3, gameObject.y - gameObject.displayHeight + projectileYOffset, 1, ['enemies']))
        this.lastFiredGun = timestep
      }
    }

    //Flame animation
    if (timestep - this.lastFlameUpdate > this.flameUpdateDelay) {
      this.frame[0] = 1 ^ this.frame[0]
      this.lastFlameUpdate = timestep

      frameChanged = true
    }

    // Hover
    gameObject.y += Math.sin(timestep / 100) * 0.4

    if (frameChanged) {
      gameObject.setFrame(`ship-${this.frame[0]}-${this.frame[1]}.png`)
    }
  }
}