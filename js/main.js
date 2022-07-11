import GameMap from "./map.js";

const tileSize = 64 //tileSize is the resolution of assets
const velocity = 2

const canvas = document.getElementById('game-map')
const ctx = canvas.getContext('2d')

const gameMap = new GameMap(tileSize)
const tank = gameMap.getTank(velocity)

console.log(tank)

function gameLoop() {
    gameMap.draw(ctx);
    tank.draw(ctx)
}

gameMap.setCanvasSize(canvas)
setInterval(gameLoop, 1000 / 75)