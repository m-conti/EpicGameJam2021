class Player extends SpriteEntity {

    constructor(x, y) {
        super(x, y);

        this.typeEntity = ENTITY_TYPES.PLAYER
        this.moveSpeed = 15;
        this.floor = FLOORS.START;
        this.health = 100;

        this.powers = [
            new WordPower(),
        ];
        this.powerIndex = 0;

        const playerContainer = new PIXI.Container();
        if (hasWebcam) {
            this.mask = PIXI.Sprite.from(PLAYER_SPRITE_PATH);
            const texture = PIXI.Texture.from((document.querySelector("#cam_picture")));
            this.playerSprite = new PIXI.Sprite(texture);
            this.playerSprite2 = PIXI.Sprite.from(PLAYER_SPRITE_PATH2);

            playerContainer.addChild(this.mask, this.playerSprite, this.playerSprite2);
            playerContainer.scale.x = 0.3;
            playerContainer.scale.y = 0.3;
            this.playerSprite.width = 400;
            this.playerSprite.height = 800;
            this.playerSprite2.width = 400;
            this.playerSprite2.height = 800;
            this.mask.width = 400;
            this.mask.height = 800;
            this.playerSprite.mask = this.mask;
            this.playerSprite.anchor.set(0.5);
            this.playerSprite2.anchor.set(0.5);
            this.mask.anchor.set(0.5);
        } else {
            const texture = PIXI.Texture.from(PLAYER_SPRITE_DEFAULT_PATH);
            this.playerSprite = new PIXI.Sprite(texture);
            this.playerSprite.anchor.set(0.5);
            this.playerSprite.scale.x = 0.1;
            this.playerSprite.scale.y = 0.1;
            playerContainer.addChild(this.playerSprite);
        }

        this.sprite = playerContainer;
        app.stage.addChild(playerContainer);
    }

    get isAlive() {
        return Boolean(this.health);
    }

    get originX() {
        return this.x - this.sprite.width / 2;
    }

    get originY() {
        return this.y - this.sprite.height / 2;
    }

    get hitBoxOrigin() {
        return { x: this.sprite.x + this.sprite.width / 2, y: this.sprite.y + this.sprite.height / 2 }
    }

    get originVector() {
        return {x: this.originX, y: this.originY};
    }

    get power() {
        return this.powers[this.powerIndex];
    }

    collidesWithEntity(entity) {
        if (entity.canCollideWithPlayer && entity.sprite) {
            const maxXEntity = entity.sprite.x + entity.sprite.width;
            const maxYEntity = entity.sprite.y + entity.sprite.height;

            return (
                ((this.sprite.x - this.sprite.width / 2) <= maxXEntity && ((this.sprite.x + this.sprite.width / 2) >= entity.sprite.x)) &&
                ((this.sprite.y - this.sprite.height / 2) <= maxYEntity && ((this.sprite.y + this.sprite.height / 2) >= entity.sprite.y))
            )
        }
        return false
    }

    isOutOfBounds() {
        if (this.sprite.x === -400)
            return false;
        return (
            (this.sprite.x <= 0 + this.sprite.width / 2 || this.sprite.y <= 0 + this.sprite.height / 2 ||
                this.sprite.x >= ROOM_SIZE * window.game.map.dimensions - this.sprite.width / 2 ||
                this.sprite.y >= ROOM_SIZE * window.game.map.dimensions - this.sprite.height / 2)
        )
    }

    isInElevator() {
        return ((this.sprite.position.x <= game.map.elevator.x + game.map.elevator.width / 2 && this.sprite.position.x >= game.map.elevator.x - game.map.elevator.width / 2)
            && (this.sprite.position.y <= game.map.elevator.y + game.map.elevator.height / 2 && this.sprite.position.y >= game.map.elevator.y - game.map.elevator.height / 2));
    }


    collidesWithWall(wall) {
        const maxXWall = wall.x + ROOM_SIZE;
        const maxYWall = wall.y + ROOM_SIZE;

        return (
            ((this.sprite.x - this.sprite.width / 2) <= maxXWall && ((this.sprite.x + this.sprite.width / 2) >= wall.x)) &&
            ((this.sprite.y - this.sprite.height / 2) <= maxYWall && ((this.sprite.y + this.sprite.height / 2) >= wall.y))
        )
    }

    incrementPower() {
        this.powerIndex = (this.powerIndex + 1) % this.powers.length;
    }

    decrementPower() {
        this.powerIndex = (this.powerIndex + this.powers.length - 1) % this.powers.length;
    }

    applyDamage(damage) {
        if (!this.isAlive) return;

        this.health = Math.max(this.health - damage, 0);

        window.game.hud.drawLifeBar(this.health);
        if (!this.health) this.onDeath();

    }

    onDeath() {
        this.remove();
        window.game.gameOver();
    }

    respawn() {
        this.x = window.game.map.spawn.x * ROOM_SIZE + (ROOM_SIZE / 2);
        this.y = window.game.map.spawn.y * ROOM_SIZE + (ROOM_SIZE / 2);

        window.game.camera.updateCameraFromPlayer(this.originX, this.originY);
    }

    tick(timeDelta) {
        const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
        const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;

        if (x < 0 && this.playerSprite.scale.x < 0) {
            if (hasWebcam) {
                this.mask.scale.x *= -1;
                this.playerSprite2.scale.x *= -1;
            }
            this.playerSprite.scale.x *= -1;
        } else if (x > 0 && this.playerSprite.scale.x > 0) {
            if (hasWebcam) {
                this.mask.scale.x *= -1;
                this.playerSprite2.scale.x *= -1;
            }
            this.playerSprite.scale.x *= -1;
        }

        const prevX = this.sprite.x;
        const prevY = this.sprite.y;

        this.sprite.position.set(this.sprite.x + x, this.sprite.y + y)
        this.move(x, y)
        if (game.enemies.length <= game.enemiesTotal - 1)//this.isInElevator() && (game.enemies.length <= (game.enemiesTotal - game.enemiesTotal / 3)))
            window.game.reloadLevel()

        if (this.isOutOfBounds() ||
            window.game.entities?.some(entity => this.collidesWithEntity(entity))
            || window.game.map.walls?.some(wall => this.collidesWithWall(wall))) {
            this.sprite.position.set(prevX, prevY)
            this.moveTo(prevX, prevY)
        }
        window.game.camera.updateCameraFromPlayer(this.originX, this.originY);

        this.power.fire(this.originVector, timeDelta)
        super.tick(timeDelta)
    }
}
