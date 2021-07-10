class Enemy extends SpriteEntity {
  constructor(x, y) {
    super(x, y);
    
    // this.graphics = new PIXI.Graphics();
    this.width = 40;
    this.height = 40;
    this.health = 100;
    this.canCollideWithPlayer = true;
    

    const texture = PIXI.Texture.from(ENEMY_SPRITE_PATH);
    const enemySprite = new PIXI.Sprite(texture);
    // enemySprite.anchor.set(0.5);
    enemySprite.scale.x = 0.1;
    enemySprite.scale.y = 0.1;
    this.sprite = enemySprite;
    app.stage.addChild(enemySprite);

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
