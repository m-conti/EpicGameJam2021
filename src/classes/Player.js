class Player extends SpriteEntity {
  constructor(x, y) {

    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.moveSpeed = 12;

    this.powers = [
      new WordPower(),
    ];
    this.powerIndex = 0;

    const texture = PIXI.Texture.from(PLAYER_SPRITE_PATH);
    const playerSprite = new PIXI.Sprite(texture);
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

  get power() {
    return this.powers[this.powerIndex];
  }

  collidesWithEntity = function(entity) {
    if (entity.canCollideWithPlayer) {
        const maxXEntity = entity.sprite.x + entity.sprite.width;
        const maxYEntity = entity.sprite.y + entity.sprite.height;

        return (
            (this.sprite.x <= maxXEntity && ((this.sprite.x + this.sprite.width) >= entity.sprite.x) ) &&
            (this.sprite.y <= maxYEntity && ((this.sprite.y + this.sprite.height) >= entity.sprite.y) )
        )
    }
    return false
  }

  tick(timeDelta) {
    const x = ((window.game.inputHandler.keyPressed[INPUT_KEYS.RIGHT] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.LEFT] ? 1 : 0)) * this.moveSpeed * timeDelta;
    const y = ((window.game.inputHandler.keyPressed[INPUT_KEYS.DOWN] ? 1 : 0) - (window.game.inputHandler.keyPressed[INPUT_KEYS.UP] ? 1 : 0)) * this.moveSpeed * timeDelta;
    
    const prevX = this.sprite.x
    const prevY = this.sprite.y

    this.sprite.position.set(this.sprite.x + x, this.sprite.y + y)
    this.move(x, y)

    if (window.game.entities?.some(entity => this.collidesWithEntity(entity))) {
      this.sprite.position.set(prevX, prevY)
      this.moveTo(prevX, prevY)
    }
    // else {
    //   this.move(x, y)
    // }

    this.power.fire(this.originVector, timeDelta)
    super.tick(timeDelta)
  }
}
