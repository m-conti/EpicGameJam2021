class Player extends SpriteEntity {
  constructor(x, y) {
    super(x, y);

    this.typeEntity = ENTITY_TYPES.PLAYER
    this.moveSpeed = 12;
    this.floor = FLOORS.START;

    this.health = 100;

    this.powers = [
      new WordPower(),
      new ExcelPower()
    ];
    this.powerIndex = 0;

    const texture = PIXI.Texture.from(PLAYER_SPRITE_PATH);
    const playerSprite = new PIXI.Sprite(texture);
    playerSprite.anchor.set(0.5);
    playerSprite.scale.x = 0.1;
    playerSprite.scale.y = 0.1;
    this.sprite = playerSprite;
    app.stage.addChild(playerSprite);
  }

  get isAlive() {
    return Boolean(this.health);
  }

  get originX() {
    return this.x - this.sprite.width / 2;
  }

  get originY() {
    return this.y;
  }

  get originVector() {
    return { x: this.originX, y: this.originY };
  }

  get power() {
    return this.powers[this.powerIndex];
  }

  collidesWithEntity = function(entity) {
    if (entity.canCollideWithPlayer && entity.sprite) {
        const maxXEntity = entity.sprite.x + entity.sprite.width;
        const maxYEntity = entity.sprite.y + entity.sprite.height;

        return (
            ((this.sprite.x - this.sprite.width / 2) <= maxXEntity && ((this.sprite.x + this.sprite.width / 2) >= entity.sprite.x) ) &&
            ((this.sprite.y - this.sprite.height / 2) <= maxYEntity && ((this.sprite.y + this.sprite.height / 2) >= entity.sprite.y) )
        )
    }
    return false
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

  respawn() {
    this.x = window.game.map.spawn.x * ROOM_SIZE + (ROOM_SIZE / 2 - this.sprite.width/2);
    this.y = window.game.map.spawn.y * ROOM_SIZE + (ROOM_SIZE / 2 - this.sprite.height/2);

    window.game.camera.updateCameraFromPlayer(this.originX, this.originY);
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
    window.game.camera.updateCameraFromPlayer(this.originX, this.originY);

    this.power.fire(this.originVector, timeDelta)
    super.tick(timeDelta)
  }
}
