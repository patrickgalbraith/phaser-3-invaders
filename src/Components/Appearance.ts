import IComponent from './IComponent'

export default class Appearance implements IComponent {
  readonly name = 'appearance'
  state = {
    texture: ''
  }

  constructor (texture: string) {
    this.texture = texture
  }

  get texture () {
    return this.state.texture
  }

  set texture (texture: string) {
    this.state.texture = texture
  }
}