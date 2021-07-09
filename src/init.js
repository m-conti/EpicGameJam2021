
const game = new Game();

const app = new PIXI.Application({
width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x00000, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

app.ticker.add(game.loop)
