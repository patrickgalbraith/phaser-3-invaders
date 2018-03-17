import IComponent from './IComponent'

// Represents a component that loops infinitely between specific frames
export default class StaticAnimationLoop implements IComponent {
  readonly name = 'staticAnimationLoop'
  state = {
    frames: [] as string[]
  }

  constructor (frames: string[]) {
    this.state.frames = frames
  }
}