class SpriteEntity extends Entity {
    constructor(x, y) {
      super(x, y)
      this.x = x
      this.y = y
    }
    
    spawn() {
      container.addChild(this.sprite)
      this.sprite.position.set(this.x, this.y)
    }

    tick(timeDelta) {
        this.sprite.position.set(this.x, this.y)
    }

    remove() {
      const index = window.game.entities.indexOf(this);
      if (index === -1) return;
      // this.graphics.clear();
      window.game.entities.splice(index, 1);
    }
}