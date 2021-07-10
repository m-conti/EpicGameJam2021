class Hud {
    constructor() {
        this.hud = new PIXI.Container();
        this.life = 100;
        this.floor = FLOORS.START;

        this.lifeBarBox = new PIXI.Graphics();

        this.lifeBarBox.beginFill(0x000000);
        this.lifeBarBox.lineStyle(1, 0xFFFFFF, 1);
        this.lifeBarBox.drawRect(10, window.innerHeight - 50, 200, 20);
        this.lifeBarBox.endFill();

        this.lifeBar = new PIXI.Graphics();
        this.lifeBar.beginFill(0x32a852);
        this.lifeBar.lineStyle(1, 0xFFFFFF, 1);
        this.lifeBar.drawRect(10, window.innerHeight - 50, this.life * 2, 20);
        this.lifeBar.endFill();

        this.settings = new PIXI.Sprite.from(textures.settings)
        this.settings.x = window.innerWidth - 60;
        this.settings.y = window.innerHeight - 60;
        this.settings.width = 40;
        this.settings.height = 40;
    }

    draw() {
        window.game.map.minimap.x += 1600;
        window.game.map.minimap.y += 200;
        hud.addChild(window.game.map.minimap);
        hud.addChild(this.hud);
        hud.addChild(this.lifeBarBox);
        hud.addChild(this.lifeBar);
        let floorText = new PIXI.Text(this.floor, {fontSize: 20, fill: 0xFFFFFF})
        floorText.position.set(10, 5);
        this.hud.addChild(this.settings);
        this.hud.addChild(floorText);
    }

    refresh () {

    }

    changeFloor(next) {
        this.floor = FLOORS[next];
    }

    lifeDamage(points) {
        this.life - points;
    }

}