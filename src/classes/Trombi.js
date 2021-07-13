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

        this.helpText = new PIXI.Text(this.getHelpText(), {
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
        this.spawnAnim = 0;
        this.textSince = 0;
        this.talkingAnim = -1;
    }

    destroy() {
        this.trombi.removeChild(this.sprite);
        this.trombi.removeChild(this.textBubble);
        this.trombi.removeChild(this.textTriangle);
        app.stage.removeChild(this.trombi);
    }

    getRandomTips() {
        return (RANDOM_TIPS[randomBetween(0, RANDOM_TIPS.length)])
    }

    getHelpText() {
        switch (game.player.currentFloor) {
            case 0:
                return "Hi I'm Trombi! It looks like you're new here! Let me help you get acquainted with your new family!";
            case 1:
                return "It looks like the IT team is in a bit of a rush at the moment! Tread carefully, you might encounter some bugs!";
            case 2:
                return "It looks like you reached our marketing team, if you wanna help your family a bit feel free to twint us at: 078 123 45 67";
            case 3:
                return "It looks like you're with our HR team, don't worry they really nice and competent people, just do as they say!";
            case 4:
                return "MWAHAHA!!! It looks like you finally arrived to the last floor! I bet you're really surprised it's me the boss! I WILL CRUSH YOU!";

            default:
                return;
        }
    }

    getSprite() {
        switch (game.player.currentFloor) {
            case 0:
            case 1:
                return PIXI.Sprite.from(TROMBI_SPRITE_PATH1);
            case 2:
            case 3:
                return PIXI.Sprite.from(TROMBI_SPRITE_PATH2);
            case 4:
                return PIXI.Sprite.from(TROMBI_SPRITE_PATH3);
            default:
                return PIXI.Sprite.from(TROMBI_SPRITE_PATH1);
        }
    }

    spawnAnimProgress(time) {
        this.sprite.anchor.set(0.5);
        this.sprite.rotation += 0.03 * time;
        if (this.spawnAnim < 45) {
            this.sprite.y += time * 10;
        } else if (this.spawnAnim < 90) {
            this.sprite.y -= time * 10;
        } else if (this.spawnAnim < 135) {
            this.sprite.y += time * 10;
        } else if (this.spawnAnim < 160) {
            this.sprite.y -= time * 10;
        } else {
            this.spawnAnim = -1;
            this.sprite.rotation = 0;
            return
        }
        this.spawnAnim += time;
    }

    talkingAnimProgress(time) {
        if (this.talkingAnim < 8)
            this.sprite.x += time * 20;
        else if (this.talkingAnim < 16) {
            this.sprite.scale.x *= -1;
            this.sprite.x -= time * 20;
        } else if (this.talkingAnim < 24) {
            this.sprite.scale.x *= -1;
            this.sprite.x += time * 20;
        } else if (this.talkingAnim < 32) {
            this.sprite.scale.x *= -1;
            this.sprite.x -= time * 20;
        } else if (this.talkingAnim < 40) {
            this.sprite.scale.x *= -1;
            this.sprite.x += time * 20;
        } else if (this.talkingAnim < 48) {
            this.sprite.scale.x *= -1;
            this.sprite.x -= time * 20;
        } else if (this.talkingAnim < 56) {
            this.sprite.scale.x *= -1;
            this.sprite.x += time * 20;
        } else if (this.talkingAnim < 64) {
            this.sprite.scale.x *= -1;
            this.sprite.x -= time * 20;
        }
        this.talkingAnim += time;
    }

    classicGameOver() {
        this.talkingAnim = -1;
        this.helpText.text = "I KNEW YOU WERE A GAUCHIASSE! DIE LEFTARD SCUM! YOU'RE FIRED!"
    }

    bossGameOver() {
        this.talkingAnim = -1;
        this.helpText.text = "YOU KILLED CAPITALISM!! SHAME ON YOU!!HAVE YOU LEARNED ANYTHING DURING THE JAM ??"
    }

    goodGameOver() {
        this.talkingAnim = -1;
        this.helpText.text = "Thank you! By removing your sorry self from the employee pool, you SAVED CAPITALISM YAY !"
    }

    tick(timeDelta) {
        if (this.spawnAnim >= 0)
            this.spawnAnimProgress(timeDelta);
        if (this.talkingAnim >= 0)
            this.talkingAnimProgress(timeDelta);
        if (this.textSince >= 0)
            this.textSince += timeDelta;
        if (this.textSince > 300) {
            this.textSince = 0;
            this.helpText.text = this.getRandomTips();
            this.talkingAnim = 0;
        }
    }
}


