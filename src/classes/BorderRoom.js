class BorderRoom extends SpriteEntity {
    constructor(x, y) {
        super(ROOM_SIZE * x, ROOM_SIZE * y);
        this.canCollideWithPlayer = true;

        const texture = PIXI.Texture.from(BORDER_ROOM_SPRITE_PATH);
        const sprite = new PIXI.Sprite(texture);

        sprite.scale.x = 0.1;
        sprite.scale.y = 0.1;
        sprite.width = ROOM_SIZE;
        sprite.height = ROOM_SIZE;

        this.sprite = sprite;
        container.addChild(sprite);
    }

    tick() {
        this.sprite.position.set(this.x, this.y)
    }
}
