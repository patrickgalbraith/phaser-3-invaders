import ISystem from './ISystem'
import IEntity from '../Entities/IEntity'
import PhaserEntity from '../Entities/PhaserEntity'
import { hasComponentType, findEntitiesByGroupName, findEntityByGameObject } from '../Helpers/Filters'
import WeaponProjectile from '../Components/WeaponProjectile'
import Group from '../Components/Group'
import Collision from '../Components/Collision'
import Health from '../Components/Health';

export default class ProjectileManager implements ISystem {

  constructor (private readonly scene: Phaser.Scene) {}

  update (entities: IEntity[], timestep?: number, delta?: number, data?: object) {
    entities.filter(hasComponentType(WeaponProjectile))
            .filter(hasComponentType(Collision))
            .forEach((entity: PhaserEntity<Phaser.Physics.Arcade.Image>) => {
              const projectileInfo = entity.getComponentType(WeaponProjectile)
              const collisionInfo  = entity.getComponentType(Collision)
              const gameObject     = entity.getGameObject()

              const targetEntities = findEntitiesByGroupName(entities, collisionInfo.targets)
                                        .map((e: PhaserEntity<any>) => e.getGameObject())

              if (targetEntities.length) {
                this.scene.physics.collide(gameObject, targetEntities, (source: any, target: any) => {
                  const targetEntity = findEntityByGameObject<any>(entities as PhaserEntity<any>[], target)

                  targetEntity.getComponentType(Health).hit(projectileInfo.damage)

                  // @todo remove entity as well
                  gameObject.destroy()
                })
              }

              // @todo check if projectiles are off-screen and destroy them if they are
            })
  }
}