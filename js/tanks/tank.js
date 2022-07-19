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
            this.tankImage, 
            this.x * this.tileSize, 
            this.y * this.tileSize, 
            this.tileSize, 
            this.tileSize)
    }

    #createSprite(){
        this.tankImage = new Image();
        this.tankImage.src = `../../img/${this.picture}`
    }

    #move() {
        if(this.currentMovingDirection !== this.requestedMovingDirection) {
                if(!this.gameMap.didCollideWithEnvironment(
                    this.x,
                    this.y, 
                    this.requestedMovingDirection))
                this.currentMovingDirection = this.requestedMovingDirection;
            
        }

        if(this.gameMap.didCollideWithEnvironment(
            this.x, 
            this.y, 
            this.currentMovingDirection)
            ) {
                return;
            }

        if (
            this.requestedMovingDirection
        )  {
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

            console.log('player movement', this.requestedMovingDirection)
        }
    }
}