import ISystem from './ISystem'
import Entity from '../Entities/Entity'
import IEntity from '../Entities/IEntity'
import { hasComponent } from '../Helpers/Filters'

export default class GameObjectManager implements ISystem {
  constructor (private readonly scene: Phaser.Scene) {}

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
    entities.filter(hasComponent('appearance'))
            .forEach((entity: IEntity) => {
              this.createEntity(entity as Entity)
            })
  }

  createEntity (entity: Entity) {
    let sprite: any = null

    if (entity.components.collision) {
      sprite = this.scene.physics.add.sprite(0, 0, entity.components.appearance.texture)
    } else {
      sprite = this.scene.add.sprite(0, 0, entity.components.appearance.texture)
    }

    entity.registerGameObject(sprite)
  }

  updateEntity (entity: IEntity, gameObject: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite) {
    if (entity.components.position) {
      gameObject.setPosition(
        entity.components.position.x,
        entity.components.position.y
      )
    }

    if (entity.components.scale) {
      gameObject.setScaleMode(
        entity.components.scale.mode == 'NEAREST' ? Phaser.ScaleModes.NEAREST : Phaser.ScaleModes.LINEAR
      )

      gameObject.setScale(
        entity.components.scale.x,
        entity.components.scale.y
      )
    }

    if (entity.components.staticAnimationLoop) {
      gameObject.updateFrame(entity.components.staticAnimationLoop.nextFrame())
    }
  }

  resize (entities: IEntity[], width: number, height: number, data?: object) {}

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {}
}