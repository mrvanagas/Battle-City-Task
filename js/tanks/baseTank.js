class Tank {
    constructor(type, health, name) {
        this.type = type;
        this.health = health;
        this.name = name;
    }

    greeting() {

    }
}

class PlayerTank extends Tank {
    constructor(type, health, name, isPlayer) {
        super(type, health, name);
        this.isPlayer = isPlayer
    }

    greeting() {
        return `${this.name} is the player tank`
    }

    playerShoot() {
        return `${this.name} I can shoot`
    }
}

class EnemyTank extends Tank {
    constructor(type, health, name) {
        super(type, health, name);
    }

    greeting() {
        return `${this.name} is the enemy tank`
    }

    enemyShoot() {
        return `${this.name} I can shoot back`
    }
}

let player = new PlayerTank('Player', 5, 'John', true)
let enemy = new EnemyTank('Enemy', 5, `Vlad`)


console.log(player.greeting());
console.log(player.playerShoot())

console.log(enemy.greeting())
console.log(enemy.enemyShoot())