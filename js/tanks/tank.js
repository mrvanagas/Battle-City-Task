import MovingDirection from './MovingDirection.js'

export default class Tank {
    constructor(x, y, tileSize, velocity, gameMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.gameMap = gameMap;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        document.addEventListener('keydown', this.#keydown)

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
        tankImage.src = '../../img/player-tank.png'

        this.tankImages = [
            tankImage //0
        ]

        this.tankImgIndex = 0
    }

    #keydown = (event) => { //arow function, so that "this" is always directed at tank class
        if (event.keyCode == 38){ //Up arrow
            if(this.currentMovingDirection == MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up
        } 

        if (event.keyCode == 40){ //Down arrow
            if(this.currentMovingDirection == MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down
        } 

        if (event.keyCode == 37){ //Left arrow
            if(this.currentMovingDirection == MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left
        } 

        if (event.keyCode == 39){ //Right arrow
            if(this.currentMovingDirection == MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right
        } 

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