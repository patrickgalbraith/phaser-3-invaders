import PhaserEntity from '../Entities/PhaserEntity'
import Collision from '../Components/Collision'
import Health from '../Components/Health'
import PrimaryWeapon from '../Components/PrimaryWeapon'

export default function (scene: Phaser.Scene) {
  const entity = new PhaserEntity<Phaser.Physics.Arcade.Sprite>('player-ship')

  entity.addComponent(new Collision(['enemies']))
  entity.addComponent(new Health(5))
  entity.addComponent(new PrimaryWeapon('blaster-lv1', 1, 250, 500))

  const sprite = scene.physics.add.sprite(0, 0, 'sprites/ship')
  sprite.setScale(1.8, 1.8)
  sprite.setOrigin(0.5, 1)
  sprite.setImmovable(true)
  sprite.setDrag(5000, 0)
  sprite.setCollideWorldBounds(true)
  sprite.setMaxVelocity(750, 1000)

  entity.setGameObject(sprite)

  return entity
}