import Phaser from 'phaser'
import { default as BootScene } from './Scenes/Boot'
import { default as GameScene } from './Scenes/Game'
import { default as GameUIScene } from './Scenes/GameUI'

export default class Main {
  game: Phaser.Game
  config: GameConfig

  constructor(parentElementID: string) {
    this.config = {
      parent: parentElementID,
      type: Phaser.AUTO,
      width: Main.getWidth(),
      height: Main.getHeight(),
      physics: {
        default: 'arcade',
        arcade: {
          // If you want gravity to apply to everything by default change the below value
          gravity: { x: 0,  y: 0 },

          // Uncomment lines below to show collision and velocity lines
          // debug: true,
          // debugShowBody: true,
          // debugShowVelocity: true
        }
      },
      pixelArt: true,
      scene: [BootScene, GameScene, GameUIScene]
    }
    this.game = new Phaser.Game(this.config)
  }

  static getWidth() {
    return 640
  }

  static getHeight() {
    return 480
  }
}