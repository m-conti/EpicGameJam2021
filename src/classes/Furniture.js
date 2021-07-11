class Furniture extends SpriteEntity {
    constructor(x, y) {
        super(x, y);
        this.width = 200;
        this.height = 200;
        this.typeEntity = ENTITY_TYPES.FURNITURE;
        this.canCollideWithPlayer = true;
    }
  
    tick() {
        ;
    }
  }
  