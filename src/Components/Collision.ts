import IComponent from './IComponent'

export default class Appearance implements IComponent {
  readonly name = 'collision'
  state = {
    targets: [] as string[]
  }

  constructor (targets: string[]) {
    this.state.targets = targets
  }

  addTarget (target: string) {
    this.state.targets.push(target)
  }

  removeTarget (target: string) {
    this.state.targets.splice(this.state.targets.indexOf(target), 1)
  }
}