class Printer extends Furniture  {
    constructor(x, y) {
        super(x, y);
        const texture = PIXI.Texture.from(PRINTER_SPRITE_PATH);
        const printerSprite = new PIXI.Sprite(texture);
        printerSprite.scale.x = 0.2;
        printerSprite.scale.y = 0.2;
        this.sprite = printerSprite;
    }
}