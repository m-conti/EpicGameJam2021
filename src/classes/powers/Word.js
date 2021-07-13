class WordProjectile extends Projectile {
  constructor(...args) {
    super(...args);

    this.typeEntity = ENTITY_TYPES.PROJECTILE
    const isLoveShot = Math.random() > (1 - PROBA_LOVE_SHOT);

    let text;
    if (isLoveShot) {
      const randomElement = LOVE_TEXT[Math.floor(Math.random() * LOVE_TEXT.length)];
      text = new PIXI.Text(randomElement, {
          fontFamily: 'Comic Sans MS',
          fill: 0xff66ff,
          fontSize: 55,
      });
      this.damage = 0;
    }
    else {
      const randomElement = CORPORATE_TEXT[Math.floor(Math.random() * CORPORATE_TEXT.length)];
      text = new PIXI.Text(randomElement, {
          fontFamily: 'Comic Sans MS',
          fill: 0x000000,
          stroke: '#FFFFFF',
          strokeThickness: 5,
      });
      this.damage = 10;
    }


    
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
      if (!([ENTITY_TYPES.PLAYER, ENTITY_TYPES.PROJECTILE, ENTITY_TYPES.DEATH].includes(entity.typeEntity))) {

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
    if (game.player.currentFloor == 4 && this.collidesWithEntity(window.game.boss)) {
            this.onCollide(window.game.boss);
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
    this.bulletSpeed = 16;
    this.reload = 0;
    this.Projectile = WordProjectile;
  }
}