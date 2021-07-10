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
}