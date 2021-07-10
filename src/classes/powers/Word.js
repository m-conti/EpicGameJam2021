class WordProjectile extends Projectile {
  constructor(...args) {
    super(...args);

    const randomElement = CORPORATE_TEXT[Math.floor(Math.random() * CORPORATE_TEXT.length)];
    const text = new PIXI.Text(randomElement);

    this.typeEntity = ENTITY_TYPES.PROJECTILE
    text.updateText(); // force it to render to texture inside
    this.sprite = new PIXI.Sprite(text.texture);
    this.sprite.position.set(this.x, this.y);

    if (this.direction.x > 0) {
      this.sprite.rotation = Math.atan2(this.direction.y, this.direction.x);
    }
    else {
      this.sprite.rotation = Math.atan2(-this.direction.y, -this.direction.x);
    }
  }

  collidesWithEntity(entity) {
      if (!([ENTITY_TYPES.PLAYER, ENTITY_TYPES.PROJECTILE].includes(entity.typeEntity))) {

          if (entity.sprite) {
            const maxXEntity = entity.sprite.x + entity.sprite.width;
            const maxYEntity = entity.sprite.y + entity.sprite.height;

            return (
                ((this.sprite.x - WORDSHOT_SQUARE / 2) <= maxXEntity && ((this.sprite.x + WORDSHOT_SQUARE / 2) >= entity.sprite.x) ) &&
                ((this.sprite.y - WORDSHOT_SQUARE / 2) <= maxYEntity && ((this.sprite.y + WORDSHOT_SQUARE / 2) >= entity.sprite.y) )
            )
          }
          else {
            ;
          }
      }
      return false
  }

  tick(timeDelta) {
    let removed = false
    for (const entity of window.game.entities) {
        if (this.collidesWithEntity(entity)) {
            this.onCollide(entity)
            break
        }
    }
    if (!removed) {
      super.tick(timeDelta);
    }
  }
}

class WordPower extends Power {
  constructor() {
    super();
    this.fireRate = 10;
    this.fireDistance = 120;
    this.bulletSpeed = 10;
    this.reload = 0;
    this.Projectile = WordProjectile;
  }
}