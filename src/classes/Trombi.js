const POS_X = innerWidth - 120;
const POS_Y =  innerHeight - innerHeight / 3;
const BUBBLE_W = 250;
const BUBBLE_H = 170;

class Trombi {

    constructor() {
        this.trombi = new PIXI.Container();
        this.sprite = new PIXI.Graphics();
        this.textBubble = new PIXI.Graphics();
        this.textTriangle = new PIXI.Graphics();
    }

    spawn() {
        app.stage.addChild(this.trombi);

        this.trombi.addChild(this.sprite);
        this.sprite.beginFill(0x0504AA);
        this.sprite.drawRect(POS_X, POS_Y, 40, 70);
        this.sprite.endFill();

        this.trombi.addChild(this.textTriangle);
        this.textTriangle.beginFill(0xFFF9CE);
        this.textTriangle.lineStyle(1, 0xFFF9CE, 1);
        this.textTriangle.moveTo(POS_X, POS_Y - 5);
        this.textTriangle.lineTo(POS_X, POS_Y - 20);
        this.textTriangle.lineTo(POS_X - 20, POS_Y - 20);
        this.textTriangle.lineTo(POS_X , POS_Y - 5);
        this.textTriangle.endFill(0xFFF9CE);

        this.trombi.addChild(this.textBubble);
        this.textBubble.beginFill(0xFFF9CE);
        this.textBubble.drawRoundedRect(POS_X - BUBBLE_W / 2 - 10, POS_Y - (BUBBLE_H + 20), BUBBLE_W, BUBBLE_H, 20);
        this.textBubble.endFill();

        this.helpText =  new PIXI.Text(this.getHelpText(), {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x000000,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        });

        this.helpText.x = POS_X - BUBBLE_W / 2;
        this.helpText.y = POS_Y - (BUBBLE_H + 20 - 10);
        this.trombi.addChild(this.helpText);
    }

    refresh() {
        this.helpText.text = this.getHelpText();
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
}


