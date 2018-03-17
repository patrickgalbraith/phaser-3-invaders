import IComponent from './IComponent'

export default class Health implements IComponent {
  readonly name = 'health'
  minHealth = 0
  maxHealth = 100
  state = {
    health: 0
  }

  constructor (health: int = 100) {
    this.state.health = health
  }

  hit (damage: int) {
    this.health = this.health - damage
  }

  isDead () {
    return this.health <= 0
  }

  get health () {
    return this.state.health
  }

  set health (val: int) {
    this.state.health = Math.max(this.minHealth, Math.min(this.maxHealth, val))
  }
}