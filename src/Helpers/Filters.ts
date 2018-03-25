import IEntity, { IComponentType } from '../Entities/IEntity'
import IComponent from '../Components/IComponent'

export const hasComponent = (componentName: string) => (entity: IEntity) => {
  return entity.hasComponentName(componentName)
}

export const hasComponentType = <T extends IComponent>(type: IComponentType<T>) => (entity: IEntity) => {
  return entity.hasComponentType(type)
}