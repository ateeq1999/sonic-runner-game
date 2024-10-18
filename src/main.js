import k from './kaplayCtx.js'
import game from './scenes/game.js'
import gameOver from './scenes/gameOver.js'
import mainMenu from './scenes/mainMenu.js'
import spritesLoader from './sprites/loader.js'

spritesLoader()

k.scene("main-menu", mainMenu)
k.scene("game", game)
k.scene("gameover", gameOver)

k.go("main-menu")