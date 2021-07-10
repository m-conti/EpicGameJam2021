
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    //this.wall1 = new Wall(60, 60);

    this.entities = [this.player];

    this.camera = new Camera(this.player);
    this.hud = new Hud();
    this.map = new Map("salut");
    this.inputHandler = new InputHandler(app);
    this.trombi = new Trombi();

    this.loop = this.loop.bind(this);
  }

  get enemies() {
    return this.entities.filter((entity) => entity instanceof Enemy);
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
    this.spawnRandomEnemies();
    console.log(this.enemies);
  }

  onEnemyDeath() {

  }

  spawnRandomEnemies() {
    const enemiesNumber = randomBetween(MIN_ENEMIES, MAX_ENEMIES)
    for (let i = 0; i < enemiesNumber; ++i) {
      const coord = this.map.getRandomTunnelCoord();
      const newEnemy = new ENEMY_LIST[randomBetween(0, ENEMY_LIST.length)](0, 0);
      const x = coord.x * ROOM_SIZE + randomBetween(1, ROOM_SIZE - newEnemy.width);
      const y = coord.y * ROOM_SIZE + randomBetween(1, ROOM_SIZE - newEnemy.height);
      newEnemy.moveTo(x, y);
      this.addEntity(newEnemy);
      newEnemy.spawn();
    }
  }

  drawHud() {
    this.hud.draw();
  }

  spawnTrombi() {
    this.trombi.spawn();
  }

  loop(timeDelta) {
    for (const entity of this.entities) {
      entity.tick(timeDelta);
    }
  }
}
