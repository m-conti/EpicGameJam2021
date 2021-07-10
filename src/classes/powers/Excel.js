class ExcelProjectile extends Projectile {
  constructor(...args) {
    super(...args);
  }
}

class ExcelPower extends Power {
  constructor() {
    super();
    this.fireRate = 1;
    this.fireDistance = 120;
    this.bulletSpeed = 20;
    this.reload = 0;
    this.Projectile = ExcelProjectile;
  }
}