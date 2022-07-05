// var MAP = [
//     [2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2],
//     [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
//     [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
//     [0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0],
//     [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0]
// ]

// var MAP_LEGEND = {
//     PLAYER_BASE: 1,
//     ENEMY_BASE: 2,
//     WALL: 3
// }

export default class GameMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.wall = this.#image('wall.png')
    }

    #image(fileName) {
        const img = new Image();
        img.src = `../img/${fileName}`
        return img;
    };

    MAP = [
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

    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx)
    }

    #drawMap(ctx) {
        for (let row = 0; row < this.MAP.length; row++) {
            for (let column = 0; column < this.MAP[row].length ; column++) {
                const tile = this.MAP[row][column];
                let image = null;
                switch (tile) {
                    case 3:
                        image = this.wall;
                        break
                }

                if (image != null)
                    ctx.drawImage(
                        image,
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    )
            }
        }
    }

    #clearCanvas(canvas, ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

    #setCanvasSize(canvas) {
        canvas.height = this.MAP.length * this.tileSize;
        canvas.width = this.MAP[0].length * this.tileSize;
    }
}