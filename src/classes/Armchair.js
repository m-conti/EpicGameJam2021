class Armchair extends Furniture  {
    constructor(x, y) {
        super(x, y);

        const texture = PIXI.Texture.from(ARMCHAIR_SPRITE_PATH);
        const armchairSprite = new PIXI.Sprite(texture);
        armchairSprite.scale.x = 0.2;
        armchairSprite.scale.y = 0.2;
        this.sprite = armchairSprite;
    }
}