const TEXTURES_TROMBI = [
  PIXI.Texture.from(TROMBI_SPRITE_PATH3),
];

class ProjectileTrombi extends EnemyProjectile {
  constructor(x, y, direction={ x: 0, y: 0 }) {
    const moveSpeed = 24;
    const damage = 1;
    super(x, y, moveSpeed, direction, damage);

    this.sprite.position.set(this.x, this.y);
  }
}

class EnemyTrombi extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.fireRate = 15;
    this.targetRange = 2000;
    this.moveSpeed = 12;

    this.isAnimate = false;
    this.animationClock = 0;
    this.textures = TEXTURES_TROMBI;
    const enemySprite = new PIXI.Sprite(this.textures[0]);
    enemySprite.scale.x = 0.1;
    enemySprite.scale.y = 0.1;
    this.sprite = enemySprite;
    app.stage.addChild(enemySprite);

    this.Projectile = ProjectileTrombi;
  }

  onDeath() {
    this.remove();
    const deathSprite = new Death(this.x + this.width / 2, this.y + this.height / 2);
    window.game.addEntity(deathSprite);
    window.game.gameOverBoss();
  }

  tick (timeDelta) {
    this.fire(timeDelta);
  }
}