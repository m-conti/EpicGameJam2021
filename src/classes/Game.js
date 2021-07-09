
class Game {
  constructor() {
    this.entities = [];
    this.loop = this.loop.bind(this);
  }

  loop(timeDelta) {
    console.log(`loop with timedelta : ${timeDelta}`);
    this.entities?.forEach((entity) => entity?.loop(timeDelta));
  }
}
