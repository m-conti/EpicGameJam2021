class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.canCollideWithPlayer = false;
  }

  spawn() {
      container.addChild(this.graphics);
  }

  remove() {
    const index = window.game.entities.indexOf(this);
    if (index === -1) return;
    this.graphics.clear();
    window.game.entities.splice(index, 1);
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  

  tick(timeDelta) {
    this.graphics.position.set(this.x, this.y);
  }
}