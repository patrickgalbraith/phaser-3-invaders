import IComponent from './IComponent'

type Point = { x: number, y: number }

export default class Position implements IComponent {
  readonly name = 'position'
  state = {
    x: 0,
    y: 0
  }

  constructor (x: number = 0, y: number = 0) {
    this.state.x = x
    this.state.y = y
  }

  getPosition () {
    return this.state
  }

  setPosition (x: number | Point, y?: number): void {
    if (typeof x != 'number') {
      y = x.y
      x = x.x
    }

    this.state.x = x
    this.state.y = y
  }

  get x () {
    return this.state.x
  }

  get y () {
    return this.state.y
  }
}