class Hud {
    constructor(player, music) {
        this.hud = new PIXI.Container();
        this.floor = player.floor;
        this.life = player.health;
        this.isSettingsOpen = false;
        this.music = music;

        this.containerText = new PIXI.Graphics()
        this.commandsText = new PIXI.Text('W: moving forward\nS: moving backward\nA: moving left\nD: moving right\nMouse: shoot', {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0xFFFFFF,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })

        this.restart = new PIXI.Text('Restart Game', {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0xFFFFFF,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230
        })

        this.floorText = new PIXI.Text(this.floor, {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x990201,
            fontWeight: 400,
        })

        this.currentTextureLifeIndex = 4;
        this.drawSetting();
    }

    draw(player, enemies, music) {
        this.isSettingsOpen = false;
        this.drawLifeBar(player.health);
        this.drawNbEnemiesLeft(enemies.length);
        this.drawSetting();
    }

    drawSetting() {
        this.settings = new PIXI.Sprite.from(textures.settings);
        this.settings.anchor.set(0.5, 0.5);
        this.settings.x = window.innerWidth - 25;
        this.settings.y = window.innerHeight - 25;
        this.settings.width = 250;
        this.settings.height = 250;
        this.settings.interactive  = true;
        this.settings.emit('pointerdown')
        this.settings.on('pointerdown', this.handleSettings.bind(this));

    
        this.containerText.beginFill(0x000000);
        this.containerText.drawRoundedRect(window.innerWidth - 360, window.innerHeight -460, 300, 400, 10)
        this.containerText.endFill();
        this.containerText.visible = this.isSettingsOpen

        this.commandsText.position.set(window.innerWidth - 355, window.innerHeight -460);
        this.commandsText.visible = this.isSettingsOpen;

       
        this.restart.position.set(window.innerWidth - 355, window.innerHeight - 260);
        this.restart.interactive = true;
        this.restart.visible = this.isSettingsOpen;

        this.restart.click = function (){  
            location.reload();
        }

        this.soundOn = new PIXI.Sprite.from(textures.soundOn);
        this.soundOn.x = window.innerWidth - 370;
        this.soundOn.y = window.innerHeight - 200;
        this.soundOn.width = 100;
        this.soundOn. height = 100;
        this.soundOn.interactive = true;
        this.soundOn.visible = this.isSettingsOpen;
       

        this.soundOn.click = ()  => {
            this.music.muted = !this.music.muted
        }

        hud.addChild(this.containerText);
        hud.addChild(this.commandsText);
        hud.addChild(this.restart);
        hud.addChild(this.soundOn);
        hud.addChild(this.settings);
        hud.addChild(this.floorText);
    }

    handleSettings() {
        if (this.isSettingsOpen) {
            this.containerText.visible = false;
            this.commandsText.visible = false;
            this.restart.visible = false;
            this.soundOn.visible = false;
        } else {
            this.containerText.visible = true;
            this.commandsText.visible = true;
            this.restart.visible = true;
            this.soundOn.visible = true;
            
            window.game.trombi.destroy();
        }
        this.isSettingsOpen = !this.isSettingsOpen;
    }

    drawLifeBar(health) {

        const text = health + '%';
        if (!this.lifePercentage) {
            this.lifePercentage = new PIXI.Text(text, {
                fontFamily: 'Comic Sans MS',
                fontSize: 20,
                fill: 0x990201,
                fontWeight: 400,
                wordWrap: true,
                wordWrapWidth: 230,
            })
            this.lifePercentage.position.set(360, window.innerHeight - 50);
            hud.addChild(this.lifePercentage)
        } else {
            this.lifePercentage.text = text;
        }

        if (!this.lifeBar) this.lifeBar = PIXI.Sprite.from(textures.life4);

        if (health === 0) {
            if (this.currentTextureLifeIndex === 0) return;
            this.lifeBar.texture = textures.life0;
            this.currentTextureLifeIndex = 0;
        } else if (health <= 25) {
            if (this.currentTextureLifeIndex === 1) return;
            this.lifeBar.texture = textures.life1;
            this.currentTextureLifeIndex = 1;
        } else if (health <= 50) {
            if (this.currentTextureLifeIndex === 2) return;
            this.lifeBar.texture = textures.life2;
            this.currentTextureLifeIndex = 2;
        } else if (health <= 75) {
            if (this.currentTextureLifeIndex === 3) return;
            this.lifeBar.texture = textures.life3;
            this.currentTextureLifeIndex = 3;
        } else if (this.currentTextureLifeIndex != 4) {
            this.lifeBar.texture = textures.life4;
            this.currentTextureLifeIndex = 4;
        }
        this.lifeBar.x = 0;
        this.lifeBar.y = window.innerHeight + 90;
        this.lifeBar.scale.set(0.1);
        this.lifeBar.rotation = 4.71239;
        hud.addChild(this.lifeBar);
    }

    drawNbEnemiesLeft(nbEnemies) {
        const text = nbEnemies + ' enemies left';
        if (!this.enemiesText) {
            this.enemiesText = new PIXI.Text(text, {
                fontFamily: 'Comic Sans MS',
                fontSize: 20,
                fill: 0x990201,
                fontWeight: 400,
                wordWrap: true,
                wordWrapWidth: 230,
            })
            this.enemiesText.position.set(500, window.innerHeight - 50);
            hud.addChild(this.enemiesText)
        } else {
            this.enemiesText.text = text;
        }
    }

    drawGameOver() {
        this.gameOverSprite = new PIXI.Sprite.from(textures.gameOver);
        this.gameOverSprite.anchor.set(0.5, 0.5);
        this.gameOverSprite.position.set(window.innerWidth / 2, window.innerHeight / 2)
        this.gameOverSprite.scale.set(0.5);
        hud.addChild(this.gameOverSprite);

        this.question = new PIXI.Text('Play again !', {
            fontFamily: 'Comic Sans MS',
            dropShadow: true,
            dropShadowBlur: 6,
            dropShadowColor: "#cd0a0a",
            dropShadowDistance: 4,
            fill: "#f50000",
            fontSize: 28,
            stroke: "red"
        });
        this.question.anchor.set(0.5, 0.5);
        this.question.x = window.innerWidth / 2;
        this.question.y = window.innerHeight / 2;
        this.question.interactive = true;
        hud.addChild(this.question);

        this.question.click = function () {
            location.reload();
        }

        this.credit = new PIXI.Text("Made with -love +PRODUCTIVITY by Lola, Louise, Matthieu, Mattia, Stan and Tim!", {
            fontFamily: 'Comic Sans MS',
            fill: "#000000",
            fontSize: 28,
            stroke: "#ffffff",
            strokeThickness: 5,
        })
        this.credit.anchor.set(0.5);
        this.credit.x = window.innerWidth / 2;
        this.credit.y = window.innerHeight - 200;
        hud.addChild(this.credit);
    }

    drawWin() {
        this.gameOverSprite = new PIXI.Sprite.from(textures.gameOver);
        this.gameOverSprite.anchor.set(0.5, 0.5);
        this.gameOverSprite.position.set(window.innerWidth / 2, window.innerHeight / 2)
        this.gameOverSprite.scale.set(0.5);
        this.gameOverSprite.tint = 0x00FF00;
        hud.addChild(this.gameOverSprite);

        this.question = new PIXI.Text('Play again !', {
            fontFamily: 'Comic Sans MS',
            fill: "#aaffaa",
            fontSize: 28,
            stroke: "#00ff00",
            strokeThickness: 5,
        });
        this.question.anchor.set(0.5, 0.5);
        this.question.x = window.innerWidth / 2;
        this.question.y = window.innerHeight / 2;
        this.question.interactive = true;
        hud.addChild(this.question);

        this.question.click = function () {
            location.reload();
        }

        this.credit = new PIXI.Text("Made with -love +PRODUCTIVITY by Lola, Louise, Matthieu, Mattia, Stan and Tim!", {
            fontFamily: 'Comic Sans MS',
            fill: "#000000",
            fontSize: 28,
            stroke: "#ffffff",
            strokeThickness: 5,
        })
        this.credit.anchor.set(0.5);
        this.credit.x = window.innerWidth / 2;
        this.credit.y = window.innerHeight - 200;
        hud.addChild(this.credit);
    }
}