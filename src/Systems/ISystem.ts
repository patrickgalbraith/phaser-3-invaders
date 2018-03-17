import IEntity from '../Entities/IEntity'

export default interface ISystem {
  create? (entities: IEntity[], events: Phaser.EventEmitter, data?: object): void
  resize? (entities: IEntity[], width: number, height: number, data?: object): void
  update? (entities: IEntity[], timestep?: number, delta?: number, data?: object): void
}