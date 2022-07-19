import Tank from "./tank.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyTank extends Tank {
    constructor(x, y, tileSize, velocity, gameMap){
        super(x, y, tileSize, velocity, gameMap, 'enemy-tank.png')

        const directionIndex = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.movingDirection = Object.keys(MovingDirection)[directionIndex];


        this.directionTimerDefault = this.#random(10, 25);
        this.directionTimer = this.directionTimerDefault;

    }

    draw(ctx) {
        this.#enemymove();
        this.#changeDirection()
        ctx.drawImage(
            this.tankImage, 
            this.x * this.tileSize, 
            this.y * this.tileSize, 
            this.tileSize, 
            this.tileSize)
    }

    #enemymove() {
        if(
            !this.gameMap.didCollideWithEnvironment(
                this.x, 
                this.y, 
                this.movingDirection
                )
            ) {
                if(
                    this.movingDirection
                ) {
                    switch(this.movingDirection) {
                        case MovingDirection.up:
                            this.y -= this.velocity
                            break;
                        case MovingDirection.down:
                            this. y += this.velocity
                            break
                        case MovingDirection.left:
                            this.x -= this.velocity
                            break
                        case MovingDirection.right:
                            this.x += this.velocity;
                            break
                    }
                }

                console.log('enemy movement', this.movingDirection)
            }
    }

    #changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null;
        if (this.directionTimer == 0) {
          this.directionTimer = this.directionTimerDefault;
          const directionIndex = Math.floor(
            Math.random() * Object.keys(MovingDirection).length
          );
          newMoveDirection = Object.keys(MovingDirection)[directionIndex];
        }
    
        if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
            if (
              !this.gameMap.didCollideWithEnvironment(
                this.x,
                this.y,
                newMoveDirection
              )
            ) {
              this.movingDirection = newMoveDirection;
            }
        }
      }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}