
class Player extends SpriteEntity {
  constructor(x, y) {

    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);

    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;

    this.moveSpeed = 12;
    this.fireRate = 25;
    this.reload = 0;

    const texture = PIXI.Texture.from('src/assets/sprites/cravate.png');
    const playerSprite = new PIXI.Sprite(texture);
    playerSprite.anchor.set(0.5);
    playerSprite.scale.x = 0.1;
    playerSprite.scale.y = 0.1;
    this.sprite = playerSprite;
    app.stage.addChild(playerSprite);
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
