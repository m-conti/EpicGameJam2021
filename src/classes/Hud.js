class Hud {
    constructor(player) {
        this.hud = new PIXI.Container();
        this.floor = FLOORS.START;

        this.drawLifeBar(20);
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
        let lifePercentage = new PIXI.Text(health + '%',  {fontSize: 20, fill: 0xFFFFFF})
        lifePercentage.position.set(360, window.innerHeight - 50);
        hud.addChild(lifePercentage)
        console.log(window.innerHeight);
        this.lifeBar.x = 0;
        this.lifeBar.y = window.innerHeight + 90;
        this.lifeBar.scale.set(0.1);
        this.lifeBar.rotation = 4.71239;
    }

    draw() {
        let floorText = new PIXI.Text(this.floor, {fontSize: 20, fill: 0xFFFFFF})

        hud.addChild(this.hud);
        hud.addChild(this.lifeBar);
        floorText.position.set(10, 5);
        hud.addChild(this.settings);
        hud.addChild(floorText);
    }
    changeFloor(next) {
        this.floor = FLOORS[next];
    }

}