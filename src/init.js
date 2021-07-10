const app = new PIXI.Application({
    width: 600, height: 600, backgroundColor: BACKGROUND_COLOR, resolution: 1,
});

const container = new PIXI.Container();

app.stage.addChild(container);

window.game = new Game(app);

document.body.appendChild(app.view);

game.spawnPlayer();

app.ticker.add(game.loop);
