class WordProjectile extends Projectile {
  constructor(...args) {
    super(...args);
  }
}

class WordPower extends Power {
  constructor() {
    super();
    this.fireRate = 10;
    this.fireDistance = 120;
    this.bulletSpeed = 20;
    this.reload = 0;
    this.Projectile = WordProjectile;
  }
}