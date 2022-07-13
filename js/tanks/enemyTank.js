import Tank from "./tank.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyTank extends Tank {
    constructor(x, y, tileSize, velocity, gameMap){
        super(x, y, tileSize, velocity, gameMap, 'enemy-tank.png')
        
    }
}