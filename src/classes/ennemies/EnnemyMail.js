class EnnemyMail extends Ennemy {
  constructor(x, y) {
    super(x, y);

    this.health = 50;
    this.graphics.moveTo(this.x, this.y);
    this.graphics.beginFill(0xFFDD1A);
    this.graphics.drawRect(0, 0, this.width, this.height);
    this.graphics.endFill();
  }
}