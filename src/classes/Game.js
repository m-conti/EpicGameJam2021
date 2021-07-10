
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    this.camera = new Camera(this.player);
    this.entities = [this.player];
    this.map = new Map("salut");
    this.inputHandler = new InputHandler(app);

    this.loop = this.loop.bind(this);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  spawnPlayer() {
    this.map.drawMap();
    this.minimapContainer = this.map.drawMinimap();
    this.minimapContainer.x = 1024;
    this.minimapContainer.y = 40;
    window.game.app.stage.addChild(this.map.mapContainer);
    window.game.app.stage.addChild(this.minimapContainer);
    this.player.spawn();
    this.player.respawn();
  }

  loop(timeDelta) {
    for (const entity of this.entities) {
      entity.tick(timeDelta);
    }
    this.camera.tick(timeDelta);
  }
}
