import Phaser from 'phaser'

export default class Boot extends Phaser.Scene {

  constructor () {
    super({
      key: 'boot'
    })
  }

  preload () {
    const gameWidth  = this.sys.canvas.width
    const gameHeight = this.sys.canvas.height

    // Simple progress bar
    const progress = this.add.graphics({})

    this.load.on('progress', function (value: number) {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(20, gameHeight / 2, Math.max(0, (gameWidth * value) - 40), 60)
    })

    this.load.on('complete', function () {
      progress.destroy()
    })

    // Backgrounds
    this.load.image('backgrounds/space',   'assets/backgrounds/space.png')

    // Sprites
    this.load.atlas('sprites/ship',        'assets/sprites/ship.png',        'assets/sprites/ship.json',        {}, {})
    this.load.atlas('sprites/enemies',     'assets/sprites/enemies.png',     'assets/sprites/enemies.json',     {}, {})
    this.load.atlas('sprites/explosion',   'assets/sprites/explosion.png',   'assets/sprites/explosion.json',   {}, {})
    this.load.atlas('sprites/laser-bolts', 'assets/sprites/laser-bolts.png', 'assets/sprites/laser-bolts.json', {}, {})
    this.load.atlas('sprites/power-up',    'assets/sprites/power-up.png',    'assets/sprites/power-up.json',    {}, {})
  }

  create () {
    this.scene.start('game')
  }
}