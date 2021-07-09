
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 50;
    this.height = 50;

    this.graphics = new PIXI.Graphics();

    this.graphics.beginFill(0xDE3249);
    this.graphics.drawRect(this.x, this.y, this.x + this.width, this.y + this.height);
    this.graphics.endFill();

  }
  
  spawn() {
    window.game.app.stage.addChild(this.graphics);
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  loop(timeDelta) {
    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }
}
