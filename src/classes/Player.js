
class Player extends Entity {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 50;

    this.moveSpeed = 2;

    this.graphics = new PIXI.Graphics();

    this.graphics.beginFill(0xDE3249);
    this.graphics.drawRect(this.x, this.y, this.x + this.width, this.y + this.height);
    this.graphics.endFill();

  }

  tick(timeDelta) {
    const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
    const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
    this.move(x, y);
    super.tick(timeDelta);
  }
}
