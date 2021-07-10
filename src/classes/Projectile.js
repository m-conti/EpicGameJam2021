
class Projectile extends SpriteEntity {
  constructor(x, y, moveSpeed=0, direction={ x: 0, y: 0 }, damage=0) {
    super(x, y);
    this.moveSpeed = moveSpeed;
    this.direction = direction;
    this.damage = damage;
    this.typeEntity = ENTITY_TYPES.PROJECTILE;
  }

  onCollide(elementCollided) {
    if (this.damage && elementCollided.applyDamage)
      elementCollided.applyDamage(this.damage);
    this.remove();
  }


  tick(timeDelta) {
    const x = this.direction.x * this.moveSpeed * timeDelta;
    const y = this.direction.y * this.moveSpeed * timeDelta;

    this.move(x, y);
    super.tick();
  }
}
