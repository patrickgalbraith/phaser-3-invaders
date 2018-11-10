import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'
import PhaserEntity from '../Entities/PhaserEntity'
import { hasComponentType } from '../Helpers/Filters'
import BackgroundLayer from '../Components/BackgroundLayer'

export default class BackdropManager implements ISystem {
  constructor (private readonly scene: Phaser.Scene) {}

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
    this.resize(entities, this.scene.sys.canvas.width, this.scene.sys.canvas.height)
  }

  resize (entities: IEntity[], width: number, height: number, data?: object) {
    entities.filter(hasComponentType(BackgroundLayer))
            .forEach((entity: PhaserEntity<Phaser.GameObjects.Image>) => {
              const gameObject = entity.getGameObject()

              gameObject.setOrigin(0, 0)
              gameObject.setDisplaySize(
                width * entity.getComponentType(BackgroundLayer).width,
                height * entity.getComponentType(BackgroundLayer).height
              )
            })
  }
}
