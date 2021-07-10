const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: BACKGROUND_COLOR,
});

const container = new PIXI.Container();
const hud = new PIXI.Container();

app.stage.addChild(container);
app.stage.addChild(hud);

window.game = new Game(app);

document.body.appendChild(app.view);

game.spawnPlayer();

game.drawHud();

app.ticker.add(game.loop);
