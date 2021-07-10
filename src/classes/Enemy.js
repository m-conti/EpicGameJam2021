class Enemy extends Entity {
  constructor(x, y) {
    super(x, y);
    
    this.graphics = new PIXI.Graphics();
    this.width = 40;
    this.height = 40;
    this.health = 100;
    this.canCollideWithPlayer = true;
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
    window.game.onEnemyDeath();
    console.log('ENEMY DEAD');

    this.remove();
  }
}
