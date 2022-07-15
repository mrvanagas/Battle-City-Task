import GameMap from "./map.js";

const tileSize = 64 //tileSize is the resolution of assets
const velocity = 1 //how fast are tanks/units moving

const canvas = document.getElementById('game-map')
const ctx = canvas.getContext('2d')


const gameMap = new GameMap(tileSize)
const playerTank = gameMap.getPlayerTank(velocity)
const enemyTanks = gameMap.getEnemyTanks(velocity)

console.log(gameMap)
console.log(playerTank)
console.log(enemyTanks)

function gameLoop() {
    clearCanvas(canvas, ctx)
    gameMap.draw(ctx);
    playerTank.draw(ctx);
    enemyTanks.forEach((enemy) => enemy.draw(ctx));
}

gameMap.setCanvasSize(canvas)
setInterval(gameLoop, 1000 / 6)

function clearCanvas(canvas, ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
