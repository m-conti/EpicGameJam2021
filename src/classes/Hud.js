class Hud {
    constructor(player) {
        this.hud = new PIXI.Container();
        this.floor = FLOORS.START;
        this.life = player.health;

        this.drawSetting();
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

    draw(player, enemies) {
        let floorText = new PIXI.Text(this.floor, {
            fontFamily: 'Comic Sans MS',
            fontSize: 20,
            fill: 0x990201,
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 230,
        })
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

    changeFloor(next) {
        this.floor = FLOORS[next];
    }

}