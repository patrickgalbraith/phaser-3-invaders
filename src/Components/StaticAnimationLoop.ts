import IComponent from './IComponent'

// Represents a component that loops infinitely between specific frames
export default class StaticAnimationLoop implements IComponent {
  readonly name = 'staticAnimationLoop'
  state = {
    current: 0,
    frames: [] as string[]
  }

  constructor (frames: string[]) {
    this.state.frames = frames
  }

  nextFrame () {
    let next = this.state.current + 1

    if (next >= this.state.frames.length) {
      next = 0
    }

    this.state.current = next

    return this.state.frames[next]
  }
}