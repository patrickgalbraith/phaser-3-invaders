import IComponent from './IComponent'

export default class Group implements IComponent {
  readonly name = 'group'
  state = {
    id: ''
  }

  constructor (id: string) {
    this.state.id = id
  }

  get id () {
    return this.state.id
  }
}