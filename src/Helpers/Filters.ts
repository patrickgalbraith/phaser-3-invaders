import IEntity from '../Entities/IEntity'

export const hasComponent = (componentName: string) => (entity: IEntity) => {
  return !!entity.components[componentName]
}