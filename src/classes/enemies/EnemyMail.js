class ProjectileMail extends EnemyProjectile {
  constructor(x, y, direction={ x: 0, y: 0 }) {
    const moveSpeed = 10;
    const damage = 10;
    super(x, y, moveSpeed, direction, damage);
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFDD1A);
    graphics.drawRect(0, 0, 10, 10);
    graphics.endFill();

    this.sprite = new PIXI.Sprite(window.game.app.renderer.generateTexture(graphics));
    this.sprite.position.set(this.x, this.y);
  }
}

class EnemyMail extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.fireRate = 14;
    this.targetRange = 1000;
    this.health = 50;
    const texture = PIXI.Texture.from(MAIL_SPRITE_PATH);
    const enemySprite = new PIXI.Sprite(texture);
    enemySprite.scale.x = 0.1;
    enemySprite.scale.y = 0.1;
    this.sprite = enemySprite;
    app.stage.addChild(enemySprite);

    this.Projectile = ProjectileMail;
  }
}