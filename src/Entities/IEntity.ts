import IComponent from '../Components/IComponent'

export default interface IEntity {
  id: string
  components: { [key:string]:any }

  addComponent (component: IComponent): void
  removeComponent (component: IComponent): void
  removeComponentByName (componentName: string): void

  save (): object
}