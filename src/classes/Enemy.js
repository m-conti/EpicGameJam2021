class Enemy extends Entity {
  constructor(x, y) {
    super(x, y);
    
    this.health = 100;

  }

  get isAlive() {
    return Boolean(this.health);
  }
  applyDamage(damage) {
    if (!this.isAlive) return;

    this.health = Math.max(this.health - damage, 0);

    if (!this.health) this.onDeath();
  }

  onDeath() {
    // animation death
    console.log('ENEMY DEAD');
    this.remove();
  }
}
