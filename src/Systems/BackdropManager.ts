import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'
import { hasComponentType } from '../Helpers/Filters'
import BackgroundLayer from '../Components/BackgroundLayer'
import Scale from '../Components/Scale'

export default class BackdropManager implements ISystem {
  constructor (private readonly scene: Phaser.Scene) {}

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
    //this.resize(entities, this.scene.sys.canvas.width, this.scene.sys.canvas.height)
  }

  // resize (entities: IEntity[], width: number, height: number, data?: object) {
  //   entities.filter(hasComponentType(BackgroundLayer))
  //           .filter(hasComponentType(Size))
  //           .forEach((entity: IEntity) => {
  //             entity.getComponentType(Size).setSize(
  //               width * entity.getComponentType(BackgroundLayer).width,
  //               height * entity.getComponentType(BackgroundLayer).height
  //             )
  //           })
  // }

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {}
}