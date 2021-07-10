class SpriteEntity extends Entity {
    constructor(x, y, w, h) {
      super(x, y)
      this.width = w
      this.height = h
    }
  
    spawn() {
      window.game.app.stage.addChild(this.sprite)
    }
  
    tick(timeDelta) {
        this.sprite.position.set(this.x, this.y)
    }
}