import PhaserEntity from '../Entities/PhaserEntity'
import Weapon from '../Components/Weapon'
import Collision from '../Components/Collision'
import WeaponProjectile from '../Components/WeaponProjectile'

export default function (scene: Phaser.Scene) {
  return function(weapon: Weapon, startX: number, startY: number, yDirection: int, collidesWith: string[]) {
    const entity = new PhaserEntity<Phaser.Physics.Arcade.Sprite>()

    entity.addComponent(new Collision(collidesWith))
    entity.addComponent(new WeaponProjectile(weapon, [0, yDirection]))

    const sprite = scene.physics.add.sprite(startX, startY, 'sprites/laser-bolts')
    sprite.setScale(1.8, 1.8)
    entity.setGameObject(sprite)

    if (yDirection < 0) {
      sprite.setFlipY(true)
      sprite.setVelocityY(weapon.velocity)
    } else {
      sprite.setVelocityY(-weapon.velocity)
    }

    return entity
  }
}