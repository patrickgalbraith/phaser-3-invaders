import IComponent from '../Components/IComponent'

export interface IComponentType<T extends IComponent> { new(...args: any[]): T }

export default interface IEntity {
  id: string
  components: { [key:string]:any }

  hasComponentName(name: string): boolean
  hasComponentType<T extends IComponent>(type: IComponentType<T>): boolean
  hasComponent(component: IComponent): boolean
  getComponent<T extends IComponent>(component: T): T
  getComponentType<T extends IComponent>(type: IComponentType<T>, ...args: any[]): T
  addComponent (component: IComponent): void
  removeComponent<T extends IComponent>(type: IComponentType<T>): T

  save (): object
}