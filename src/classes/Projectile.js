
class Projectile extends SpriteEntity {
  constructor(x, y, moveSpeed=0, direction={ x: 0, y: 0 }, damage=0) {
    super(x, y);
    this.moveSpeed = moveSpeed;
    this.direction = direction;
    this.damage = damage;
    this.width = 80;
    this.height = 8;
  }

  onCollide(elementCollided) {
    this.remove();
    if (this.damage && elementCollided.applyDamage)
      elementCollided.applyDamage(this.damage);
  }

  tick(timeDelta) {
    const x = this.direction.x * this.moveSpeed * timeDelta;
    const y = this.direction.y * this.moveSpeed * timeDelta;
    this.move(x, y);
    super.tick();
  }
}
