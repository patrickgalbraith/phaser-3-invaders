import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'

export default class BackdropManager implements ISystem {
  constructor (private readonly scene: Phaser.Scene) {}

  // create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
  //   entities.withComponent('backgroundLayer').forEach((entity: IEntity) => {
  //     if (entity.components.backgroundLayer) {
  //       this.createBackdrop(entity)
  //     }
  //   })
  // }

  // createBackdrop (entity: IEntity) {
  //   const image = this.scene.add.image(0, 0, entity.components.appearance.texture)
  //   image.setScaleMode(Phaser.ScaleModes.LINEAR)

  //   entity.addComponent(new GameObjectReference(image))
  // }

  resize (entities: IEntity[], width: number, height: number, data?: object) {
    entities.withComponent('backgroundLayer').forEach((entity: IEntity) => {
      // Entity update sets entity to _dirty
      entity.update(entity => {
        components.scale.setScale(
          width * entity.components.backgroundLayer.width,
          height * entity.components.backgroundLayer.height
        )
      })
    })
  }

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {}
}