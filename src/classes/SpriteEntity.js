class SpriteEntity extends Entity {
    constructor(x, y) {
      super(x, y)
      this.x = x
      this.y = y

      this.animationTimer = 0;
      this.animationIndex = 0;
    }
    
    spawn() {
      container.addChild(this.sprite)
      this.sprite.position.set(this.x, this.y)
    }

    animate(timeDelta) {
      if (this.animationTimer || !this.isOnScreen) {
        this.animationTimer = Math.max(this.animationTimer - timeDelta, 0);
        return;
      }
      this.sprite.texture = this.textures[this.animationIndex];
      this.animationIndex = (this.animationIndex + 1) % this.textures.length;
      this.animationTimer = this.animationClock;
    }

    tick(timeDelta) {
      if (this.isAnimate && this.textures && this.sprite) this.animate(timeDelta);

      this.sprite.position.set(this.x, this.y)
    }

    remove() {
      const index = window.game.entities.indexOf(this);
      if (index === -1) return;
      // this.graphics.clear();
      window.game.entities.splice(index, 1);
      container.removeChild(this.sprite);
    }
}