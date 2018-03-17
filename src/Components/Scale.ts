import IComponent from './IComponent'

export default class Scale implements IComponent {
  readonly name = 'scale'
  state = {
    x: 1.0,
    y: 1.0,
    mode: 'NEAREST'
  }

  constructor (x: number = 0, y: number = 0, mode: string = 'NEAREST') {
    this.state.x = x
    this.state.y = y
    this.state.mode = mode
  }

  setScale (x: number, y: number) {
    this.state.x = x
    this.state.y = y
  }

  setScaleMode (mode: string) {
    this.state.mode = mode
  }
}