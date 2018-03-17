import IComponent from './IComponent'

export default class BackgroundLayer implements IComponent {
  readonly name = 'backgroundLayer'
  state = {
    width: 1.0,
    height: 1.0
  }

  constructor (width: number, height: number) {
    this.state.width  = width
    this.state.height = height
  }
}