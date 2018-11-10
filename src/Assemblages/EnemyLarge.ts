import PhaserEntity from '../Entities/PhaserEntity'
import Collision from '../Components/Collision'
import Health from '../Components/Health'
import StaticAnimationLoop from '../Components/StaticAnimationLoop'
import Group from '../Components/Group'

export default function (scene: Phaser.Scene) {
  return function(row: int = 0, col: int = 0) {
    const entity = new PhaserEntity<Phaser.Physics.Arcade.Sprite>()

    entity.addComponent(new StaticAnimationLoop(['enemy-big-0-0.png', 'enemy-big-0-1.png']))
    entity.addComponent(new Group('enemies'))
    entity.addComponent(new Health(5))

    const sprite = scene.physics.add.sprite(0, 0, 'sprites/enemies', entity.getComponentType(StaticAnimationLoop).nextFrame())
    sprite.setImmovable(true)
    sprite.setScale(1.8, 1.8)
    sprite.setPosition(
      50 + (col * (sprite.displayWidth  / 2 + 20)),
      50 + (row * (sprite.displayHeight / 2 + 20))
    )

    entity.setGameObject(sprite)

    return entity
  }
}