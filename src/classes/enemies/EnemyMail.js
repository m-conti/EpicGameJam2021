class ProjectileMail extends Projectile {
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
    this.graphics.moveTo(this.x, this.y);
    this.graphics.beginFill(0xFFDD1A);
    this.graphics.drawRect(0, 0, this.width, this.height);
    this.graphics.endFill();
    this.Projectile = ProjectileMail;
  }
}