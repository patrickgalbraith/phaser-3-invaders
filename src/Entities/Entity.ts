import IEntity from './IEntity'
import IComponent from '../Components/IComponent'
import { uuid } from '../Helpers/UUID'

export default class Entity implements IEntity {
  id: string
  components: { [key:string]:any } = {}

  constructor (idGenerator: Function = uuid) {
    this.id = idGenerator()
  }

  addComponent (component: IComponent) {
    this.components[component.name] = component
  }

  removeComponent (component: IComponent) {
    this.removeComponentByName(component.name)
  }

  removeComponentByName (componentName: string) {
    delete this.components[componentName]
  }

  save () {
    return {
      id: this.id,
      components: Object.keys(this.components)
                        .map(key => this.components[key].state)
    }
  }

  toString () {
    return `${this.save()}`
  }
}