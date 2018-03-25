import Main from './Main'

function startGame () {
  const game = new Main('game-root')
}

document.addEventListener('DOMContentLoaded', () => {
  const _window = window as any

  _window.WebFont.load({
    google: {
      families: ['Press Start 2P']
    },
    active: function() {
      startGame()
    }
  })
})