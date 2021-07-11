class Hud {
    constructor() {
        this.hud = new PIXI.Container();
        this.floor = FLOORS.START;
        this.containerText = new PIXI.Graphics();
        this.floorText = new PIXI.Text(this.floor, {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x990201,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })
        this.commandsText = new PIXI.Text('W: moving forward\nS: moving backward\nA: moving left\nD: moving right\nMouse: shoot\nV: increment power\nC: decrement power', {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0xFFFFFF,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })
        this.isSettingsOpen = false;
    }

    draw(player, enemies) {
        window.game.map.minimap.x += window.innerWidth;
        window.game.map.minimap.y += window.innerHeigth;
        hud.addChild(window.game.map.minimap);

        hud.addChild(this.hud);

        this.drawLifeBar(player.health);
        this.drawNbEnemiesLeft(enemies.length);
        this.drawSetting();
        
        this.floorText.position.set(10, 5);
        hud.addChild(this.floorText);
    }

    drawSetting() {
        this.settings = new PIXI.Sprite.from(textures.settings);
        this.settings.anchor.set(0.5, 0.5);
        this.settings.x = window.innerWidth - 40;
        this.settings.y = window.innerHeight - 40;
        this.settings.width = 40;
        this.settings.height = 40;
        this.settings.interactive  = true;
        this.settings.emit('pointerdown')
        this.settings.on('pointerdown', this.handleSettings.bind(this));

        this.containerText.beginFill(0x000000);
        this.containerText.drawRoundedRect(window.innerWidth - 260, window.innerHeight -360, 200, 300, 10)
        this.containerText.endFill();
        this.containerText.visible = this.isSettingsOpen

        this.commandsText.position.set(window.innerWidth - 255, window.innerHeight -360);
        this.commandsText.visible = this.isSettingsOpen;

        hud.addChild(this.containerText);
        hud.addChild(this.commandsText);
        hud.addChild(this.settings);
    }

    handleSettings() {
        if (this.isSettingsOpen) {
            this.containerText.visible = false;
            this.commandsText.visible = false;
        } else {
            this.containerText.visible = true;
            this.commandsText.visible = true;
        }
        this.isSettingsOpen = !this.isSettingsOpen;
    }

    drawLifeBar(health) {
        let lifePercentage = new PIXI.Text(health + '%',  {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x990201,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })
        lifePercentage.position.set(360, window.innerHeight - 50);
        hud.addChild(lifePercentage)

        if (health === 0) {
            this.lifeBar = PIXI.Sprite.from(textures.life0);
        } else if (health <= 25) {
            this.lifeBar = PIXI.Sprite.from(textures.life1);
        } else if(health <= 50) {
            this.lifeBar = PIXI.Sprite.from(textures.life2);
        } else if(health <= 75) {
            this.lifeBar = PIXI.Sprite.from(textures.life3);
        } else {
            this.lifeBar = PIXI.Sprite.from(textures.life4);
        }
        this.lifeBar.x = 0;
        this.lifeBar.y = window.innerHeight + 90;
        this.lifeBar.scale.set(0.1);
        this.lifeBar.rotation = 4.71239; 
        hud.addChild(this.lifeBar);        
    }

    drawNbEnemiesLeft(nbEnemies) {
        let enemiesText = new PIXI.Text(nbEnemies + ' enemies left', {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x990201,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })
        enemiesText.position.set(500, window.innerHeight - 50);
        hud.addChild(enemiesText)
    }

    changeFloor(next) {
        this.floor = FLOORS[next];
    }

}