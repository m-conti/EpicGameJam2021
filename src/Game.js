
class Game {
  constructor() {
    this.entities = [];

  }

  loop() {
    this.entities.forEach((entity) => entity.loop());
  }
}
