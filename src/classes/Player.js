
class Player extends Entity {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 50;

    this.moveSpeed = 12;

    this.powers = [
      new WordPower(),
    ];
    this.powerIndex = 0;

    this.graphics = new PIXI.Graphics();
    this.graphics.moveTo(this.x, this.y);
    this.graphics.beginFill(0xFFAAAA);
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

  get power() {
    return this.powers[this.powerIndex];
  }

  respawn() {
    this.x = window.game.map.spawn.x * ROOM_SIZE + (ROOM_SIZE / 2 - this.width/2);
    this.y = window.game.map.spawn.y * ROOM_SIZE + (ROOM_SIZE / 2 - this.height/2);

    window.game.app.stage.x = -window.game.map.spawn.x * ROOM_SIZE + window.game.app.renderer.width / 2;
    window.game.app.stage.y = -window.game.map.spawn.y * ROOM_SIZE + window.game.app.renderer.height / 2;
  }

  tick(timeDelta) {
    const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
    const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
    this.move(x, y);
    this.power.fire(this.originVector, timeDelta);
    super.tick(timeDelta);
  }
}
