class Camera {
    constructor(player) {
        this.moveSpeed = player.moveSpeed;
    }

    reset() {
        this.x = window.game.map.spawn.x * ROOM_SIZE - window.game.app.renderer.width / 2 + ROOM_SIZE / 2;
        this.y = window.game.map.spawn.y * ROOM_SIZE - window.game.app.renderer.height / 2 + ROOM_SIZE / 2;
        container.x = -this.x;
        container.y = -this.y;
    }

    tick(timeDelta) {
        const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
        const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
        this.x += x;
        this.y += y;
        container.x = -this.x;
        container.y = -this.y;
    }
}
