import Tank from "./tank.js";
import MovingDirection from "./MovingDirection.js";

export default class PlayerTank extends Tank {
    constructor(x, y, tileSize, velocity, gameMap){
        super(x, y, tileSize, velocity, gameMap, 'player-tank.png')
        
        document.addEventListener('keydown', this.#keydown)

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

}