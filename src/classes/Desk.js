class Desk extends Furniture  {
    constructor(x, y) {
        super(x, y);

        const texture = PIXI.Texture.from(DESK_SPRITE_PATH);
        const deskSprite = new PIXI.Sprite(texture);
        deskSprite.scale.x = 0.2;
        deskSprite.scale.y = 0.2;
        this.sprite = deskSprite;
    }
}