class Hud {
    constructor() {
        this.hud = new PIXI.Container();
    }

    draw() {
        app.stage.addChild(this.hud);

        let floorText = new PIXI.Text("Floor: ", {fontSize: 40, fill: 0xFFFFFF})

        this.hud.addChild(floorText);
    }

    refresh () {

    }

}