export default function displayLevelUpText(scene: Phaser.Scene, width: number, height: number, level: number) {
  const text = scene.add.text(0, 0, `Level ${level}`, { font: '32px "Press Start 2P"', fill: '#ffffff' })
  const x    = (width / 2) - (text.width / 2)
  const y    = (height / 2) - (text.height / 2) - 20

  text.setPosition(x, y)
  text.alpha = 0

  const tweenIn = () => {
    scene.tweens.add({
      targets : text,
      delay   : 100,
      duration: 1000,
      alpha   : 1,
      y       : y + 20,
      ease    : 'Sine.easeIn',
      onComplete: () => tweenOut()
    })
  }

  const tweenOut = () => {
    scene.tweens.add({
      targets : text,
      delay   : 1000,
      duration: 1000,
      alpha   : 0,
      ease    : 'Sine.easeInOut',
      onComplete: () => { text.destroy() }
    })
  }

  // Start tween
  tweenIn()
}