import Entity from '../Entities/Entity'
import Appearance from '../Components/Appearance'
import BackgroundLayer from '../Components/BackgroundLayer'

export default function () {
  const entity = new Entity()

  entity.addComponent(new Appearance('backgrounds/space'))
  entity.addComponent(new BackgroundLayer(1.0, 1.0))

  return entity
}