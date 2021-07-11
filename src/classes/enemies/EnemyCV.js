const TEXTURE_CV = [
  PIXI.Texture.from(CV_SPRITE_PATH1),
  PIXI.Texture.from(CV_SPRITE_PATH2),
];

class ProjectileCV extends EnemyProjectile {
  constructor(x, y, direction={ x: 0, y: 0 }) {
    const moveSpeed = 6;
    const damage = 4;
    super(x, y, moveSpeed, direction, damage);

    this.sprite.position.set(this.x, this.y);
  }
}

class EnemyCV extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.fireRate = 11;
    this.targetRange = 800;
    this.health = 20;
    
    this.isAnimate = true;
    this.animationClock = 11;
    this.textures = TEXTURE_CV;
    const enemySprite = new PIXI.Sprite(textures[0]);
    enemySprite.scale.x = 0.1;
    enemySprite.scale.y = 0.1;
    this.sprite = enemySprite;
    app.stage.addChild(enemySprite);
    
    this.Projectile = ProjectileCV;
  }
}