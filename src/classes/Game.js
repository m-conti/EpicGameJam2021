
class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(50, 50);
    this.entities = [this.player];
    this.inputHandler = new InputHandler();

    this.loop = this.loop.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  handleInput(event) {
    switch (event.type) {
      case 'keydown': return this.inputHandler.onKeyDown(event.key);
      default: console.error(`input not handle: ${event.type}`);
    }
  }

  spawnPlayer() {
    this.player.spawn();
  }

  loop(timeDelta) {
    // console.log(`loop with timedelta : ${timeDelta}`);
    this.entities?.forEach((entity) => entity?.loop(timeDelta));
  }
}
