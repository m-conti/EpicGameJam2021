
class Player extends Entity {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 50;

    this.moveSpeed = 12;

    this.health = 100;

    this.powers = [
      new WordPower(),
      new ExcelPower()
    ];
    this.powerIndex = 0;

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

  get isAlive() {
    return Boolean(this.health);
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

  incrementPower() {
    this.powerIndex = (this.powerIndex + 1) % this.powers.length;
  }

  decrementPower() {
    this.powerIndex = (this.powerIndex + this.powers.length - 1) % this.powers.length;
  }

  applyDamage(damage) {
    if (!this.isAlive) return;

    this.health = Math.max(this.health - damage, 0);

    if (!this.health) this.onDeath();
  }

  onDeath() {
    // animation death
    console.log('PLAYER DEAD');
    this.remove();
  }

  tick(timeDelta) {
    const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
    const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
    this.move(x, y);
    this.power.fire(this.originVector, timeDelta);
    super.tick(timeDelta);
  }
}
