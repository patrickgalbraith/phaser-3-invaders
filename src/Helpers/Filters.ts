import IEntity, { IComponentType } from '../Entities/IEntity'
import IComponent from '../Components/IComponent'
import Group from '../Components/Group'
import PhaserEntity from '../Entities/PhaserEntity'

export const hasComponent = (componentName: string) => (entity: IEntity) => {
  return entity.hasComponentName(componentName)
}

export const hasComponentType = <T extends IComponent>(type: IComponentType<T>) => (entity: IEntity) => {
  return entity.hasComponentType(type)
}

export const findEntitiesByGroupName = (entities: IEntity[], groupName: string[]) => {
  return entities.filter(hasComponentType(Group))
                 .filter(e => groupName.indexOf(e.getComponentType(Group).id) >= 0)
}

export const findEntityByGameObject = <T>(entities: PhaserEntity<any>[], gameObject: T) => {
  return entities.find(e => e.getGameObject() == gameObject) as PhaserEntity<T>
}