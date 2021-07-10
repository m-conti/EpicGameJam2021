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

    updateCameraFromPlayer(x, y) {
        this.x = x - window.game.app.renderer.width / 2;
        this.y = y - window.game.app.renderer.height / 2;
        container.x = -this.x;
        container.y = -this.y;
    }
}
