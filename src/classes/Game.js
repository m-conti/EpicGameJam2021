
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    this.wall1 = new Wall(60, 60);

    this.entities = [this.player, this.wall1];

    this.camera = new Camera(this.player);
    this.hud = new Hud();
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
    container.addChild(this.map.mapContainer);
    container.addChild(this.minimapContainer);
    this.player.spawn();
    this.player.respawn();
  }

  drawHud() {
    this.hud.draw();
  }

  loop(timeDelta) {
    for (const entity of this.entities) {
      entity.tick(timeDelta);
    }
    this.camera.tick(timeDelta);
  }
}
