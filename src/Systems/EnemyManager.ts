import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'
import PhaserEntity from '../Entities/PhaserEntity'
import { findEntitiesByGroupName } from '../Helpers/Filters'
import createEnemySmall from '../Assemblages/EnemySmall'
import createEnemyMedium from '../Assemblages/EnemyMedium'
import createEnemyLarge from '../Assemblages/EnemyLarge'
import Health from '../Components/Health';

/*
  Spawn Patterns (1 per level)
  - = No Enemy
  S = Small Enemy
  M = Medium Enemy
  L = Large Enemy
*/
const spawnPatterns: string[][] = [
  // Level 1
  [
    'M--------M',
    'SSSSSSSSSS'
  ],
  // Level 2
  [
    'MMMMMMMMMMMM',
    'SSSSSSSSSSSS'
  ],
  // Level 3
  [
    '-----LL-----',
    'MMMMMMMMMMMM',
    'SSSSSSSSSSSS',
    'SSSSSSSSSSSS'
  ],
  // Level 4
  [
    'L----LL----L',
    'MMMMMMMMMMMM',
    'MMMMMMMMMMMM',
    'SSSSSSSSSSSS',
    'SSSSSSSSSSSS'
  ],
  // Level 5
  [
    'L-L-L--L-L-L',
    'MMMMMMMMMMMM',
    'MMMMMMMMMMMM',
    'SSSSSSSSSSSS',
    'SSSSSSSSSSSS'
  ],
  // Level 6
  [
    'LLLLLLLLLLLL',
    'MMMMMMMMMMMM',
    'MMMMMMMMMMMM',
    'SSSSSSSSSSSS',
    'SSSSSSSSSSSS'
  ]
]

const enemyWidth  = 32 * 1.8
const enemyHeight = 32 * 1.8

export type EnemyEntity = PhaserEntity<Phaser.Physics.Arcade.Sprite>

export default class EnemyManager implements ISystem {
  private distanceMovedX = 0
  private distanceMovedY = 0
  private directionX     = 1
  private speed          = 0.5
  private lastLevel      = 0

  private createEnemySmall  = createEnemySmall(null)
  private createEnemyMedium = createEnemyMedium(null)
  private createEnemyLarge  = createEnemyLarge(null)

  constructor (private readonly scene: Phaser.Scene) {
    this.createEnemySmall  = createEnemySmall(scene)
    this.createEnemyMedium = createEnemyMedium(scene)
    this.createEnemyLarge  = createEnemyLarge(scene)
  }

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: any) {
    this.spawnEnemies(data.level, entities)
    this.resize(entities, this.scene.sys.canvas.width, this.scene.sys.canvas.height)
  }

  resize (entities: IEntity[], width: number, height: number, data?: object) {
    // @todo move enemies into game bounds
  }

  update (entities: IEntity[], timestep?: number, delta?: number, data?: any) {
    let moveDown = false

    const entitiesToRemove: IEntity[] = []

    if (this.distanceMovedY > enemyHeight / 2) {
      moveDown = false
      this.distanceMovedX = 0
      this.distanceMovedY = 0
      this.directionX *= -1
    } else if (this.distanceMovedX > (enemyWidth * 2) - 20) {
      moveDown = true
    }

    if (moveDown) {
      this.distanceMovedY = this.distanceMovedY + this.speed
    } else {
      this.distanceMovedX = this.distanceMovedX + this.speed
    }

    findEntitiesByGroupName(entities, ['enemies']).forEach((entity: EnemyEntity) => {
      if (entity.getComponentType(Health).isDead()) {
        entitiesToRemove.push(entity)
        this.destroyEnemy(entity)
        return
      }

      this.updateEnemy(entity, timestep, moveDown, this.directionX)
    })

    entitiesToRemove.forEach((entity) => {
      entities.splice(entities.indexOf(entity), 1)
    })

    if (this.lastLevel !== data.level) {
      this.spawnEnemies(data.level, entities)
    }
  }

  private destroyEnemy (entity: EnemyEntity) {
    const gameObject   = entity.getGameObject()
    const explosion    = this.scene.add.sprite(gameObject.x, gameObject.y, 'sprites/explosion')
    const fadeOutDelay = 200
    const fadeOutTime  = 800

    explosion.setScale(1.5)

    gameObject.setTint(0xff0000)

    this.scene.tweens.add({
      targets : gameObject,
      delay   : fadeOutDelay,
      duration: fadeOutTime,
      alpha   : 0,
      ease    : 'Bounce.easeInOut'
    })

    // Destroy display object after tween finishes
    this.scene.time.addEvent({
      delay: fadeOutDelay + fadeOutTime,
      callback: () => {
        explosion.destroy()
        gameObject.destroy()
      }
    })

    this.scene.time.addEvent({
      repeat: 4,
      delay: 100,
      callback: () => {
        explosion.setAlpha(explosion.alpha === 0 ? 1 : 0)
      }
    })
  }

  private updateEnemy (
    entity: EnemyEntity,
    timestep: number,
    moveDown: boolean,
    direction: int
  ) {
    const gameObject = entity.getGameObject()

    gameObject.setPosition(
      moveDown ? gameObject.x : gameObject.x + (direction * this.speed),
      moveDown ? gameObject.y + this.speed : gameObject.y
    )
  }

  private spawnEnemies (level: int, entities: IEntity[]) {
    const spawnPattern = spawnPatterns[Math.min(spawnPatterns.length, level) - 1]

    spawnPattern.forEach((row, rowIndex) => {
      for (let index = 0; index < row.length; index++) {
        const element = row[index]

        switch (element) {
          case 'S':
            entities.push(this.createEnemySmall(rowIndex, index))
            break

          case 'M':
            entities.push(this.createEnemyMedium(rowIndex, index))
            break

          case 'L':
            entities.push(this.createEnemyLarge(rowIndex, index))
            break

          default:
            break
        }
      }
    })

    this.lastLevel = level
  }
}
