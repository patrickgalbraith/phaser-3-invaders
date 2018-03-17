import Entity from '../Entities/Entity'
import Appearance from '../Components/Appearance'
import Position from '../Components/Position'
import Collision from '../Components/Collision'
import Health from '../Components/Health'
import StaticAnimationLoop from '../Components/StaticAnimationLoop'

export default function () {
  const entity = new Entity()

  entity.addComponent(new Appearance('sprites/enemies'))
  entity.addComponent(new Position())
  entity.addComponent(new StaticAnimationLoop(['enemy-small-0-0.png', 'enemy-small-0-1.png']))
  entity.addComponent(new Collision(['enemies']))
  entity.addComponent(new Health(5))

  return entity
}