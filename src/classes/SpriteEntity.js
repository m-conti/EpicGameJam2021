class SpriteEntity extends Entity {
    constructor(x, y, w, h) {
      super(x, y)
      this.width = w
      this.height = h
      this.x = x
      this.y = y
    }
    
    spawn() {
      container.addChild(this.sprite)
      this.sprite.position.set(this.x, this.y)
    }

    moveTo(x, y) {
      this.x = x;
      this.y = y;
    }
  
    tick(timeDelta) {
        this.sprite.position.set(this.x, this.y)
    }
}