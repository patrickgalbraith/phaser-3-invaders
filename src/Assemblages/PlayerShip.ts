import Entity from '../Entities/Entity'
import Appearance from '../Components/Appearance'
import Position from '../Components/Position'
import Collision from '../Components/Collision'
import Health from '../Components/Health'

export default function () {
  const entity = new Entity()

  entity.addComponent(new Appearance('sprites/ship'))
  entity.addComponent(new Position())
  entity.addComponent(new Collision(['enemies']))
  entity.addComponent(new Health(5))

  return entity
}