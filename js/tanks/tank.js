import MovingDirection from './MovingDirection.js'

export default class Tank {
    constructor(x, y, tileSize, velocity, gameMap, picture) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.gameMap = gameMap;
        this.picture = picture

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.#createSprite();
    }

    draw(ctx) {
        this.#move();

        ctx.drawImage(
            this.tankImages[this.tankImgIndex], 
            this.x, 
            this.y, 
            this.tileSize, 
            this.tileSize)
    }

    #createSprite(){
        const tankImage = new Image();
        tankImage.src = `../../img/${this.picture}`

        this.tankImages = [
            tankImage //0
        ]

        this.tankImgIndex = 0
    }


    #move() {
        if(this.currentMovingDirection !== this.requestedMovingDirection) {
            if (
            Number.isInteger(this.x / this.tileSize) && 
            Number.isInteger(this.y / this.tileSize)
            ) {
                if(!this.gameMap.didCollideWithEnvironment(
                    this.x,
                    this.y, 
                    this.requestedMovingDirection))
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }

        if(this.gameMap.didCollideWithEnvironment(
            this.x, 
            this.y, 
            this.currentMovingDirection)
            ) {
                return;
            }

        switch(this.currentMovingDirection){
            case MovingDirection.up:
                this.y -= this.velocity;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                break;
            case MovingDirection.right:
                this.x += this.velocity
                break;
        }
    }
}