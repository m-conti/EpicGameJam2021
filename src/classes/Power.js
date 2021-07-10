class Power {
  constructor() {
    this.fireRate = 0;
    this.fireDistance = 120;
    this.bulletSpeed = 20;
    this.reload = 0;
    this.Projectile = Projectile;
  }

  fire(origin, timeDelta) {
    if (this.reload) {
      this.reload = Math.max(this.reload - timeDelta, 0);
      return;
    }
    if (window.game.inputHandler.keyPressed[INPUT_KEYS.FIRE]) {
      const target = getMousePos();
      const direction = getFireVector(origin, target);
      const bullet = new this.Projectile(
        origin.x + direction.x * this.fireDistance,
        origin.y + direction.y * this.fireDistance,
        this.bulletSpeed,
        direction
      );
      window.game.addEntity(bullet);
      bullet.spawn();
      this.reload = this.fireRate;
    }

  }
}