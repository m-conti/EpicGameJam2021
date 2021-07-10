
class Projectile extends Entity {
  constructor(x, y, moveSpeed=0, direction={ x: 0, y: 0 }, damage=0) {
    super(x, y);
    this.moveSpeed = moveSpeed;
    this.direction = direction;
    this.damage = damage;

    this.width = 5;
    this.height = 5;

    this.graphics = new PIXI.Graphics();

    this.graphics.beginFill(0xDE3249);
    this.graphics.drawRect(this.x, this.y, this.x + this.width, this.y + this.height);
    this.graphics.endFill();
  }

  onCollide(elementCollided) {
    this.remove();
    elementCollided?.applyDamage(this.damage);
  }

  tick(timeDelta) {
    const x = this.direction.x * this.moveSpeed * timeDelta;
    const y = this.direction.y * this.moveSpeed * timeDelta;
    this.move(x, y);
    super.tick();
  }
}
