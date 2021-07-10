
class Wall extends SpriteEntity {
    constructor(x, y) {
  
      super(x, y, WALL_WIDTH, WALL_HEIGHT);
  
      this.width = WALL_WIDTH;
      this.height = WALL_HEIGHT;
      this.canCollideWithPlayer = true;
  
      const texture = PIXI.Texture.from('src/assets/sprites/wall.png');
      const wallSprite = new PIXI.Sprite(texture);
      wallSprite.scale.x = 0.1;
      wallSprite.scale.y = 0.1;
      this.sprite = wallSprite;
      app.stage.addChild(wallSprite);
    }
  
    tick() {
        this.sprite.position.set(this.x, this.y)
    }
  }
  