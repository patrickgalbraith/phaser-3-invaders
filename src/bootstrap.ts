import * as WebFont from 'webfontloader'
import Main from './Main'

function startGame () {
  const game = new Main('game-root')
}

document.addEventListener('DOMContentLoaded', () => {
  WebFont.load({
    google: {
      families: ['Press Start 2P']
    },
    active: function() {
      startGame()
    }
  })
})