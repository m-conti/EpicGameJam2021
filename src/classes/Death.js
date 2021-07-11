class Death extends SpriteEntity {
    constructor(x, y) {
      super(x, y, 0, 0);

      this.timeToLive = TIME_TO_LIVE_DEATH;

      const texture = PIXI.Texture.from(DEATH_SPRITE_PATH);
      const deathSprite = new PIXI.Sprite(texture);
      deathSprite.scale.x = 0.1;
      deathSprite.scale.y = 0.1;
      this.sprite = deathSprite;
      container.addChild(deathSprite);
      this.sprite.position.set(this.x, this.y);
    }
  
    tick(timeDelta) {
      this.timeToLive -= timeDelta;

      this.sprite.scale.x -= 0.0001;
      this.sprite.scale.y -= 0.0001;
      if (this.timeToLive < 0) {
        this.remove();
        return
      }
    }
  }
  