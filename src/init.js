let hasWebcam;

function detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then(devices => {
        callback(devices.some(device => 'videoinput' === device.kind));
    })
}

detectWebcam(function(webcam) {
    hasWebcam = webcam;

    if (!hasWebcam) {
        startGame();
    } else {
        Webcam.set({
            width: 320,
            height: 240,
            image_format: 'jpeg',
            jpeg_quality: 90
        });
        Webcam.attach('#webcam');
    }
})

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        // display results in page
        document.getElementById('results').innerHTML =
            '<img id="cam_picture" src="' + data_uri + '"/>';
    });
}

function startGame() {
    document.querySelector("#webcam_container").style.display = 'none';

    window.app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: BACKGROUND_COLOR,
    });

    window.container = new PIXI.Container();
    window.hud = new PIXI.Container();

    app.stage.addChild(container);
    app.stage.addChild(hud);

    window.game = new Game(app);

    document.body.appendChild(app.view);

    game.spawnPlayer();

    game.drawHud();

    game.spawnTrombi();

    app.ticker.add(game.loop);
}