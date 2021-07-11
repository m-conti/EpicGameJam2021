class Hud {
    constructor(player) {
        this.hud = new PIXI.Container();
        this.floor = FLOORS.START;
        this.life = player.health;

        this.drawSetting();
    }

    draw(player, enemies) {
        let floorText = new PIXI.Text(this.floor, {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x990201,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })
        console.log('XXXXX',window.game.map.minimap.x)
        window.game.map.minimap.x += 1600;
        window.game.map.minimap.y += 200;
        hud.addChild(window.game.map.minimap);

        hud.addChild(this.hud);
        this.drawLifeBar(player.health)
        console.log(enemies.length)
        this.drawNbEnemiesLeft(enemies.length)
        
        floorText.position.set(10, 5);
        hud.addChild(this.settings);
        hud.addChild(floorText);
    }

    drawSetting() {
        this.settings = new PIXI.Sprite.from(textures.settings)
        this.settings.anchor.set(0.5, 0.5);
        this.settings.x = window.innerWidth - 40;
        this.settings.y = window.innerHeight - 40;
        this.settings.width = 40;
        this.settings.height = 40;
        this.settings.interactive  = true;
    }

    drawLifeBar(health) {

        const text = health + '%';
        if (!this.lifePercentage) {
            this.lifePercentage = new PIXI.Text(text,  {
                fontFamily: 'Comic Sans MS',
                fontSize: 20,
                fill: 0x990201,
                fontWeight: 400,
                wordWrap: true,
                wordWrapWidth: 230,
            })
        }
        else {
            this.lifePercentage.text = text;
        }
        this.lifePercentage.position.set(360, window.innerHeight - 50);
        hud.addChild(this.lifePercentage)

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
        }
        else {
            this.enemiesText.text = text;
        }
    }

    changeFloor(next) {
        this.floor = FLOORS[next];
    }

}