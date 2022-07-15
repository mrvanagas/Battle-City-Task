import {PlayerTank, EnemyTank} from './tanks/baseTank.js'

const MAP = [
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
const tileSize = 64

//I have adapted the all rendering from the Tank example, however I see that there is some code duplication happening, mainly with createSprite and draw methods.
//Perhaps it is possible to put them in a separate file/module and call them when needed?
class Wall {
    constructor(name, position, tileSize, picture) {
        this.name = name;
        this.position = position;
        this.tileSize = tileSize;
        this.picture = picture;
        this.#createSprite()
    }

    #createSprite() {
        this.sprite = new Image();
        this.sprite.src = `../img/${this.picture}`

    }

    draw(ctx) {
        // console.log( this.position, this.name)
        ctx.drawImage(
            this.sprite,
            this.position.x * this.tileSize,
            this.position.y * this.tileSize,
            this.tileSize,
            this.tileSize
        )
    }
}

class GameWall extends Wall {
    constructor(name, position, tileSize){
        super(name, position, tileSize, 'wall.png')
    }
}

export default class GameMap {
    constructor() {
        // this.wall = this.#image('wall.png');
        this.MAP = MAP;

       
    }

    // #image(fileName) {
    //     const img = new Image();
    //     img.src = `../img/${fileName}`
    //     return img;
    // };

    

    // draw(canvas, ctx) {
    //     this.#setCanvasSize(canvas);
    //     this.#clearCanvas(canvas, ctx);
    //     this.#drawMap(ctx)
    // }

    generateObjects() {
        const tanks = [];
        const walls = [];
        console.log('walls', walls)
        console.log(tanks)
        for (let row = 0; row < this.MAP.length; row++) {
            for (let column = 0; column < this.MAP[row].length ; column++) {
                const tile = this.MAP[row][column];
                let image = null;
                switch (tile) {
                    case 3:
                       const gameWall = new GameWall('wall' + row + '-' + column, {
                        x: column,
                        y: row
                       },
                       tileSize)
                       walls.push(gameWall)
                       break;

                    case 1:
                        const playerTank = new PlayerTank(10, 'playertank' + row + '-' + column, {
                            x: column,
                            y: row
                        }, 
                        tileSize)
                        tanks.push(playerTank)
                        break
                    case 2:
                        const enemyTank = new EnemyTank(10, 'EnemyTank' + row + '-' + column, {
                            x: column,
                            y: row
                        },
                        tileSize)
                        tanks.push(enemyTank)
                        break
                }
            }
        }

        return {
            tanks,
            walls
        }
    }

   
}