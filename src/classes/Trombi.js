class Trombi {
    constructor() {
        this.trombi = new PIXI.Container();
        this.textBubble = new PIXI.Graphics();
        this.textTriangle = new PIXI.Graphics();
    }

    spawn() {
        app.stage.addChild(this.trombi);

        this.sprite = this.getSprite();
        this.trombi.addChild(this.sprite);
        this.sprite.x = TROMBI_X;
        this.sprite.y = TROMBI_Y;
        this.sprite.scale.x = 0.08;
        this.sprite.scale.y = 0.08;

        this.trombi.addChild(this.textTriangle);
        this.textTriangle.beginFill(0xFFF9CE);
        this.textTriangle.lineStyle(1, 0xFFF9CE, 1);
        this.textTriangle.moveTo(TROMBI_X + 10, TROMBI_Y + 30);
        this.textTriangle.lineTo(TROMBI_X, TROMBI_Y - 20);
        this.textTriangle.lineTo(TROMBI_X - 20, TROMBI_Y - 20);
        this.textTriangle.lineTo(TROMBI_X + 10, TROMBI_Y + 30);
        this.textTriangle.endFill(0xFFF9CE);

        this.trombi.addChild(this.textBubble);
        this.textBubble.beginFill(0xFFF9CE);
        this.textBubble.drawRoundedRect(TROMBI_X - BUBBLE_W / 2, TROMBI_Y - BUBBLE_H, BUBBLE_W, BUBBLE_H, 20);
        this.textBubble.endFill();

        this.helpText =  new PIXI.Text(this.getHelpText(), {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x000000,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        });

        this.helpText.x = TROMBI_X - BUBBLE_W / 2 + 10;
        this.helpText.y = TROMBI_Y - (BUBBLE_H - 10);
        this.trombi.addChild(this.helpText);
    }

    destroy() {
        app.stage.removeChild(this.trombi);
    }

    refresh() {
        this.helpText.text = this.getHelpText();
        this.sprite = this.getSprite();
    }

    getHelpText() {
        switch (game.player.floor) {
            case FLOORS.START: return "Hi I'm Trombi! It looks like you're new here! Let me help you get acquainted with your new family!";
            case FLOORS.IT: return "It looks like the IT team is in a bit of a rush at the moment! Tread carefully, you might encounter some bugs!";
            case FLOORS.MARKETING: return "It looks like you need to pay to stop seeing the pop-up ads, you can use my credit card number: 4578 4562 5643 9173";
            case FLOORS.HR: return "It looks like you're with our HR team, don't worry they really nice and competent people, just do as they say!";
            case FLOORS.END: return "MWAHAHA!!! It looks like you finally arrived to the last floor! I bet you're really surprised it's me the boss! I WILL CRUSH YOU!";

            default: return;
        }
    }

    getSprite() {
        switch (game.player.floor) {
            case FLOORS.START, FLOORS.IT: return PIXI.Sprite.from(TROMBI_SPRITE_PATH1);
            case FLOORS.MARKETING, FLOORS.HR: return PIXI.Sprite.from(TROMBI_SPRITE_PATH2);
            case FLOORS.END: return PIXI.Sprite.from(TROMBI_SPRITE_PATH3);

            default: return PIXI.Sprite.from(TROMBI_SPRITE_PATH1);
        }
    }
}


