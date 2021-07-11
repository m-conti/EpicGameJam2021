class ProjectileCV extends EnemyProjectile {
  constructor(x, y, direction={ x: 0, y: 0 }) {
    const moveSpeed = 6;
    const damage = 4;
    super(x, y, moveSpeed, direction, damage);
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFF00AA);
    graphics.drawRect(0, 0, 10, 10);
    graphics.endFill();

    this.sprite = new PIXI.Sprite(window.game.app.renderer.generateTexture(graphics));
    this.sprite.position.set(this.x, this.y);
  }
}

class EnemyCV extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.fireRate = 18;
    this.targetRange = 400;
    this.health = 20;

    this.isAnimate = true;
    this.animationClock = 80;
    this.textures = [
      PIXI.Texture.fromFrame(CV_SPRITE_PATH1),
      PIXI.Texture.fromFrame(CV_SPRITE_PATH2),
    ];
    const enemySprite = new PIXI.Sprite(textures[0]);
    enemySprite.scale.x = 0.1;
    enemySprite.scale.y = 0.1;
    this.sprite = enemySprite;
    app.stage.addChild(enemySprite);

    this.Projectile = ProjectileCV;
  }
}