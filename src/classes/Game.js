
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    this.entities = [this.player];
    this.hud = new Hud();
    this.map = new Map("salut");
    this.inputHandler = new InputHandler(app);

    this.loop = this.loop.bind(this);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  spawnPlayer() {
    this.minimapContainer = this.map.drawMap();
    this.minimapContainer.x = 1024;
    this.minimapContainer.y = 40;
    window.game.app.stage.addChild(this.minimapContainer);
    this.player.spawn();
  }

  drawHud() {
    this.hud.draw();
  }

  loop(timeDelta) {
    // console.log(`loop with timedelta : ${timeDelta}`);
    for (const entity of this.entities) {
      entity.tick(timeDelta);
    }
  }
}
