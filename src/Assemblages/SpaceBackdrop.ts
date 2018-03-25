import PhaserEntity from '../Entities/PhaserEntity'
import Appearance from '../Components/Appearance'
import BackgroundLayer from '../Components/BackgroundLayer'
import Scale from '../Components/Scale'
import Position from '../Components/Position'

export default function () {
  const entity = new PhaserEntity()

  entity.addComponent(new Appearance('backgrounds/space'))
  entity.addComponent(new BackgroundLayer(1.0, 1.0))
  //entity.addComponent(new Size())
  entity.addComponent(new Position(0, 0))

  return entity
}