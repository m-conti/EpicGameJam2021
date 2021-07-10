
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    this.wall1 = new Wall(300, 300);

    this.entities = [this.player, this.wall1];

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

  loop(timeDelta) {
    for (const entity of this.entities) {
      entity.tick(timeDelta);
    }
  }
}
