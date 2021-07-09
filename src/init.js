
const game = new Game();

let lastLoopTime = 0;

const cb = (loopTime) => {
  game.loop(loopTime - lastLoopTime);
  lastLoopTime = loopTime;
  window.requestAnimationFrame(cb);
}

window.requestAnimationFrame(cb);
