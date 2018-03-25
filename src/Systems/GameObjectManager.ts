import ISystem from './ISystem'
import PhaserEntity from '../Entities/PhaserEntity'
import IEntity from '../Entities/IEntity'
import { hasComponentType } from '../Helpers/Filters'
import Appearance from '../Components/Appearance'
import Collision from '../Components/Collision'
import Position from '../Components/Position'
import Scale from '../Components/Scale'
import StaticAnimationLoop from '../Components/StaticAnimationLoop'

export default class GameObjectManager implements ISystem {
  constructor (private readonly scene: Phaser.Scene) {}

  create (entities: IEntity[], events: Phaser.EventEmitter, data?: object) {
    entities.filter(hasComponentType(Appearance))
            .forEach((entity: IEntity) => {
              this.createEntity(entity as PhaserEntity)
            })
  }

  createEntity (entity: PhaserEntity) {
    let sprite: any = null

    if (entity.hasComponentType(Collision)) {
      sprite = this.scene.physics.add.sprite(0, 0, entity.getComponentType(Appearance).texture)
    } else {
      sprite = this.scene.add.sprite(0, 0, entity.getComponentType(Appearance).texture)
    }

    entity.setGameObject(sprite)
    this.updateEntity(entity)
  }

  updateEntity (entity: PhaserEntity) {
    const gameObject = entity.getGameObject<Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite>()

    if (entity.hasComponentType(Position)) {
      gameObject.setPosition(
        entity.getComponentType(Position).x,
        entity.getComponentType(Position).y
      )
    }

    if (entity.hasComponentType(Scale)) {
      gameObject.setScaleMode(
        entity.getComponentType(Scale).phaserScaleMode()
      )

      gameObject.setScale(
        entity.getComponentType(Scale).x,
        entity.getComponentType(Scale).y
      )
    }

    if (entity.hasComponentType(StaticAnimationLoop)) {
      //gameObject.updateFrame(entity.getComponentType(StaticAnimationLoop).nextFrame())
    }
  }

  resize (entities: IEntity[], width: number, height: number, data?: object) {}

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {
    // entities.forEach((entity) => {
    //   this.updateEntity(entity as PhaserEntity)
    // })
  }
}