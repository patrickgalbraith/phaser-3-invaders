import IEntity, { IComponentType } from './IEntity'
import IComponent from '../Components/IComponent'
import { uuid } from '../Helpers/UUID'

export default class PhaserEntity implements IEntity {
  id: string
  components: IComponent[] = []
  gameObject: any

  constructor (idGenerator: Function = uuid) {
    this.id = idGenerator()
  }

  private getComponentIndex<T extends IComponent>(type: IComponentType<T>): number {
    for (let i = 0; i < this.components.length; ++i) {
      const component: IComponent = this.components[i]

      if (component instanceof type) {
        return i
      }
    }
    return -1
  }

  hasComponentName(name: string): boolean {
    for (let i = 0; i < this.components.length; ++i) {
      const component: IComponent = this.components[i]

      if (component.name === name) {
        return true
      }
    }
    return false
  }

  hasComponentType<T extends IComponent>(type: IComponentType<T>): boolean {
    return this.getComponentIndex(type) !== -1
  }

  hasComponent(component: IComponent): boolean {
    return this.components.indexOf(component) !== -1
  }

  getComponent<T extends IComponent>(component: T): T {
    const index = this.components.indexOf(component)

    if (index === -1) {
      return null
    }

    return this.components[index] as T
  }

  getComponentType<T extends IComponent>(type: IComponentType<T>, ...args: any[]): T {
    const index: number = this.getComponentIndex(type)

    if (index !== -1) {
      return this.components[index] as T
    }

    return null
  }

  addComponent(component: IComponent): void {
    this.components.push(component)
  }

  removeComponent<T extends IComponent>(type: IComponentType<T>): T {
    const component: IComponent = this.getComponentType(type)
    this.components.splice(this.components.indexOf(component), 1)
    return component as T
  }

  setGameObject(gameObject: any) {
    this.gameObject = gameObject
  }

  getGameObject<T>(): T {
    return this.gameObject as T
  }

  save () {
    return {
      id: this.id,
      components: this.components.forEach(c => c.state)
    }
  }

  toString () {
    return `${this.save()}`
  }
}