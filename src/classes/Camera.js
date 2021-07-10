class Camera {
    constructor(player) {
        this.moveSpeed = player.moveSpeed;
    }

    tick(timeDelta) {
        const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
        const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
        window.game.app.stage.x -= x;
        window.game.app.stage.y -= y;
    }
}
