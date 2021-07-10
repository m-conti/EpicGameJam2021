
class Player extends Entity {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 50;

    this.moveSpeed = 12;
    this.fireRate = 25;
    this.reload = 0;

    this.graphics = new PIXI.Graphics();
    this.graphics.moveTo(this.x, this.y);
    this.graphics.beginFill(0xDE3249);
    this.graphics.drawRect(0, 0, this.width, this.height);
    this.graphics.endFill();
    this.graphics.beginFill(0x00FF00);
    this.graphics.drawRect(this.width / 2, this.height / 2, this.width / 2, this.height / 2);
    this.graphics.drawRect(0, 0, this.width / 2, this.height / 2);
    this.graphics.endFill();
  }

  get originX() {
    return this.x + this.width / 2;
  }

  get originY() {
    return this.y + this.height / 2;
  }

  get originVector() {
    return { x: this.originX, y: this.originY };
  }

  fire(timeDelta) {
    if (this.reload) {
      this.reload = Math.max(this.reload - timeDelta, 0);
      return;
    }
    if (window.game.inputHandler.keyPressed[INPUT_KEYS.FIRE]) {
      const target = getMousePos();
      console.log(this.originVector, target);
      console.log(getFireVector({ x: this.originX, y: this.originY }, target));
      this.reload = this.fireRate;
    }
  }

  tick(timeDelta) {
    const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
    const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
    this.move(x, y);
    this.fire(timeDelta);
    super.tick(timeDelta);
  }
}
