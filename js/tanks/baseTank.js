class Tank {
    constructor(health, name, position, tileSize ,picture) {
        this.health = health;
        this.name = name;
        this.position = position; // {x: 0, y: 10}
        this.picture = picture;
        this.tileSize = tileSize;
        this.#createSprite();
        
    }

    #createSprite() {
        this.sprite = new Image();
        this.sprite.src = `../img/${this.picture}`

    }

    draw(ctx) {
        // console.log( this.position, this.name)
        // TODO: discuss tile size constant
        // TODO: discuss relying on abstraction not on implementation
        ctx.drawImage(
            this.sprite,
            this.position.x * this.tileSize,
            this.position.y * this.tileSize,
            this.tileSize,
            this.tileSize
        )
    }
}

export class PlayerTank extends Tank {
    constructor(health, name, position, tileSize) {
        super(health, name, position, tileSize, 'player-tank.png');
    }

    
    playerShoot() {
        return `${this.name} I can shoot`
    }
}

export class EnemyTank extends Tank {
    constructor(health, name, position, tileSize) {
        super(health, name, position, tileSize, 'enemy-tank.png');
    }

   
    enemyShoot() {
        return `${this.name} I can shoot back`
    }
}
