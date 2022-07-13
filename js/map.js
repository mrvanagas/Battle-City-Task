import PlayerTank from "./tanks/playerTank.js";
import enemyTank from './tanks/enemyTank.js'

import MovingDirection from "./tanks/MovingDirection.js";
import EnemyTank from "./tanks/enemyTank.js";

export default class GameMap {
    constructor(tileSize) {
        this.tileSize = tileSize

        this.wall = new Image()
        this.wall.src = '../img/wall.png'
    }

    //map legend
    //1 - player
    //2 - enemy
    //3 - wall
    map = [
        [2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0],
        [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0]
    ];

    draw(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column]
                if (tile === 3) {
                    this.#drawWall(ctx, column, row, this.tileSize)
                }
            }
        }
    }

    #drawWall(ctx, column, row, size) {
        ctx.drawImage(
            this.wall, 
            column * this.tileSize, 
            row * this.tileSize,
            size,
            size
        )
    }

    getPlayerTank(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column]
                if (tile === 1) {
                    return new PlayerTank(
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    )
                }
            }
        }
    }

    getEnemyTanks(velocity) {
        const enemies = []

        for(let row = 0; row < this.map.length; row++) {
            for(let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                if (tile === 2) {
                    this.map[row][column] = 0;
                    enemies.push(new EnemyTank(
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    ))
                }
            }
        }
        return enemies;
    }

    setCanvasSize(canvas) { //we set here the size of the game map/canvas relative to the tileSize constant
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize
    }

    didCollideWithEnvironment(x, y, direction) {
        if(
        Number.isInteger(x / this.tileSize) && 
        Number.isInteger(y / this.tileSize)
        ) {
            let column  = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch(direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize
                    break;
            }
            const tile = this.map[row][column];
            if(tile === 3) {
                return true
            }
        }
        return false;
    }
}