import IComponent from './IComponent'
import Weapon from './Weapon'

export default class WeaponProjectile implements IComponent {
  readonly name: string = 'weapon-projectile'
  state = {
    damage: 1,
    velocity: 100,
    heading: [0, 1]
  }

  constructor (weapon: Weapon, heading: int[]) {
    this.state.damage = weapon.damage
    this.state.velocity = weapon.velocity
    this.state.heading = heading
  }

  get damage () {
    return this.state.damage
  }

  get velocity () {
    return this.state.velocity
  }
}