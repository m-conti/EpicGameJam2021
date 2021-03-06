
const app = new PIXI.Application({
width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x00000, resolution: window.devicePixelRatio || 1,
});

const container = new PIXI.Container();

app.stage.addChild(container);

window.game = new Game(app);

document.body.appendChild(app.view);

game.spawnPlayer();

app.ticker.add(game.loop);
