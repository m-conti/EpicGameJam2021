const MUSIC_PATH = 'src/assets/audio/Tromby_Music.mp3'
const GAME_OVER_MUSIC_AUDIO = 'src/assets/audio/gameover.mp3'
const music = new Audio(MUSIC_PATH);

class Game {
    constructor(app) {
        this.app = app;
        
        this.music = music
        this.player = new Player(-400, -400);
        this.entities = [this.player];
        this.camera = new Camera(this.player);
        this.hud = new Hud(this.player, music);
        this.furnitures = [];
        this.map = new Map(this);
        this.inputHandler = new InputHandler(app);
        this.trombi = new Trombi();
        this.loop = this.loop.bind(this);
        this.isOver = false;
        this.music.loop = true;
        this.gameoverMusic = new Audio(GAME_OVER_MUSIC_AUDIO);
    }
    
    get enemies() {
        return this.entities.filter((entity) => entity instanceof Enemy);
    }
    
    addEntity(entity) {
        this.entities.push(entity);
    }

    spawnFurnitures() {
        console.log("furnitures", this.furnitures)
        for (const furniture of this.furnitures) {
            this.addEntity(furniture);
            furniture.spawn();
        }
    }

    spawnPlayer() {
        this.map.initializeMap(this);
        container.addChild(this.map.mapContainer);
        this.player.x = -400;
        this.player.y = -400;
        this.player.spawn();
        this.player.respawn();
        this.spawnRandomEnemies();
        this.boss = new EnemyTrombi(this.map.exit.x * ROOM_SIZE + (ROOM_SIZE /2), this.map.exit.y * ROOM_SIZE + (ROOM_SIZE /2))
        this.boss.spawn();
        this.music.play();
        this.gameoverMusic.pause()
        this.spawnFurnitures();
    }

    onEnemyDeath() {
        this.hud.drawNbEnemiesLeft(this.enemies.length);
    }

    spawnRandomEnemies() {
        const enemiesNumber = randomBetween(MIN_ENEMIES, MAX_ENEMIES)
        this.enemiesTotal = enemiesNumber;
        for (let i = 0; i < enemiesNumber; ++i) {
            const coord = this.map.getRandomTunnelCoord();
            const newEnemy = new ENEMY_LIST[randomBetween(0, ENEMY_LIST.length)](0, 0);
            const x = coord.x * ROOM_SIZE + randomBetween(1, ROOM_SIZE - newEnemy.width);
            const y = coord.y * ROOM_SIZE + randomBetween(1, ROOM_SIZE - newEnemy.height);
            newEnemy.moveTo(x, y);
            this.addEntity(newEnemy);
            newEnemy.spawn();
        }
    }

    drawHud() {
        this.hud.draw(this.player, this.enemies, this.music);
    }

    spawnTrombi() {
        this.trombi.spawn();
    }

    removeAllEntities() {
        this.entities.forEach(entity => {
            entity.remove();
        })
        container.removeChild(this.player.sprite);
    }

    reloadLevel() {
        this.player.floor = FLOORS.IT;

        this.removeAllEntities();
        this.map.emptyMap();
        this.spawnPlayer();
        this.entities.push(this.player);
    }

    gameOver() {
        this.hud.drawGameOver();
        this.trombi.classicGameOver();
        this.isOver = true;
        this.music.pause()
        this.gameoverMusic.muted = this.music.muted;
        this.gameoverMusic.play();
    }

    gameOverBoss() {
        this.hud.drawGameOver();
        this.trombi.bossGameOver();
        this.isOver = true;
        this.music.pause()
        this.gameoverMusic.muted = this.music.muted;
        this.gameoverMusic.play();
    }

    gameOverGood() {
        this.hud.drawWin();
        this.trombi.goodGameOver();
        this.isOver = true;
    }

    loop(timeDelta) {
        if (this.isOver) return;
        for (const entity of this.entities) {
            entity.tick(timeDelta);
        }
        this.trombi.tick(timeDelta);
        this.boss.tick(timeDelta);
    }
}
