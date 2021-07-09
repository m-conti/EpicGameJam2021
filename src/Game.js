
class Game {
  constructor() {
    this.entities = [];

  }

  loop(timeDelta) {
    this.entities.forEach((entity) => entity.loop(timeDelta));
  }
}
