class WordProjectile extends Projectile {
  constructor(...args) {
    super(...args);

    const randomElement = CORPORATE_TEXT[Math.floor(Math.random() * CORPORATE_TEXT.length)];
    const text = new PIXI.Text(randomElement);
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