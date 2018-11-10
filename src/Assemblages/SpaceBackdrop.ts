import PhaserEntity from '../Entities/PhaserEntity'
import BackgroundLayer from '../Components/BackgroundLayer'

export default function (scene: Phaser.Scene) {
  const entity = new PhaserEntity<Phaser.GameObjects.Image>('space-background')

  entity.addComponent(new BackgroundLayer(1.0, 1.0))

  const sprite = scene.add.image(0, 0, 'backgrounds/space')
  entity.setGameObject(sprite)

  return entity
}