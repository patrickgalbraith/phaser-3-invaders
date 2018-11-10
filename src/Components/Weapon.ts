import IComponent from './IComponent'

export default class Weapon implements IComponent {
  readonly name: string = 'weapon'
  state = {
    weaponName: '',
    damage: 1,
    rate: 1000,
    velocity: 100
  }

  constructor (weaponName: string, damage: int, rate: number, velocity: number) {
    this.state.weaponName = weaponName
    this.state.damage = damage
    this.state.rate = rate
    this.state.velocity = velocity
  }

  get weaponName () {
    return this.state.weaponName
  }

  get damage () {
    return this.state.damage
  }

  get rate () {
    return this.state.rate
  }

  get velocity () {
    return this.state.velocity
  }
}