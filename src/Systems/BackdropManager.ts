import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'
import { hasComponent } from '../Helpers/Filters'

export default class BackdropManager implements ISystem {
  constructor (private readonly scene: Phaser.Scene) {}

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
    this.resize(entities, this.scene.sys.canvas.width, this.scene.sys.canvas.height)
  }

  resize (entities: IEntity[], width: number, height: number, data?: object) {
    entities.filter(hasComponent('backgroundLayer'))
            .forEach((entity: IEntity) => {
              entity.components.scale.setScale(
                width * entity.components.backgroundLayer.width,
                height * entity.components.backgroundLayer.height
              )
            })
  }

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {}
}