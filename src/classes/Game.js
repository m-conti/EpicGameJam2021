
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    this.entities = [this.player];
    this.inputHandler = new InputHandler();
    this.hud = new Hud();

    this.loop = this.loop.bind(this);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  spawnPlayer() {
    this.player.spawn();
  }

  drawHud() {
    this.hud.draw();
  }

  loop(timeDelta) {
    console.log(`loop with timedelta : ${timeDelta}`);
    for (const entity of this.entities) {
      entity.tick(timeDelta);
    }
  }
}
