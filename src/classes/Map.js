const MINIMAP_COLORS = {
    '0': 0x000,
    '1': 0xFF0000,
    '2': 0x00FF00,
    '3': 0x0000FF,
}

const MAP_FLOORS = {
    '0': PIXI.Texture.from('src/assets/sprites/floors/floor.png'),
    '1': PIXI.Texture.from('src/assets/sprites/floors/floor.png'),
    '2': PIXI.Texture.from('src/assets/sprites/floors/floor.png'),
    '3': PIXI.Texture.from('src/assets/sprites/floors/floor.png'),
}

class Map {
    constructor(game) {
        this.theme = "";

        this.walls = [];
        this.dimensions = 15;
        //this.initializeMap(game);
    }

    emptyMap() {
        this.wall = [];

        container.removeChild(this.mapContainer);
        window.app.stage.removeChild(this.minimap);
        window.game.furnitures = [];
    }

    initializeMap(game) {
        this.walls = [];

        this.generateMap();
        this.minimap = this.drawMinimap();
        this.mapContainer = this.drawMap(game);
        this.elevator = this.spawnElevator();
        this.mapContainer.addChild(this.elevator);
        window.app.stage.addChild(this.minimap);
    }

    drawMap(game) {
        let mapContainer = new PIXI.Container();
        for (let x = 0; x < this.dimensions; x++) {
            for (let y = 0; y < this.dimensions; y++) {
                let room = new PIXI.Sprite(MAP_FLOORS[this.map[x][y]]);

                room.x = x * ROOM_SIZE;
                room.y = y * ROOM_SIZE;
                switch (this.map[x][y]) {
                    case 0:
                        room.tint = 0x111111;
                        this.walls.push(room);
                        break;
                    case 1:
                        if (Math.random() > PROBA_FURNISH_ROOM) {
                            const newFurniture = new FURNITURE_LIST[randomBetween(0, FURNITURE_LIST.length)](0, 0);
                            const xFurniture = room.x + randomBetween(1, ROOM_SIZE - newFurniture.width);
                            const yFurniture = room.y + randomBetween(1, ROOM_SIZE - newFurniture.height);
                            newFurniture.moveTo(xFurniture, yFurniture);
                            game.furnitures.push(newFurniture);
                        }
                        break;
                    case 2:
                        room.tint = 0x00FF00;
                        break;
                    case 3:
                        room.tint = 0x0000FF;
                        break;
                }
                mapContainer.addChild(room);
                room.width = ROOM_SIZE;
                room.height = ROOM_SIZE;
            }
        }
        return mapContainer;
    }

    drawMinimap() {
        let minimap = new PIXI.Container();
        for (let x = 0; x < this.dimensions; x++) {
            for (let y = 0; y < this.dimensions; y++) {
                if (this.map[x][y]) {
                    let room = new PIXI.Graphics();

                    room.beginFill(MINIMAP_COLORS[this.map[x][y]]);
                    room.drawRect(x * 10, y * 10, 10, 10);
                    room.endFill();

                    minimap.addChild(room);
                }
            }
        }
        return minimap;
    }

    spawnElevator() {
        let sprite = new PIXI.Sprite.from(ELEVATOR_SPRITE);
        sprite.x = this.exit.x * ROOM_SIZE + (ROOM_SIZE / 2);
        sprite.y = this.exit.y * ROOM_SIZE + (ROOM_SIZE / 2);
        sprite.anchor.set(0.5);
        sprite.scale.x = 0.1;
        sprite.scale.y = 0.1;
        return sprite;
    }

    getRandomTunnelCoord() {
        return this.freeTunnels[randomBetween(0, this.freeTunnels.length)];
    }

    generateMap() {
        function createArray(num, dimensions) {
            let array = [];
            for (let i = 0; i < dimensions; i++) {
                array.push([]);
                for (let j = 0; j < dimensions; j++) {
                    array[i].push(num);
                }
            }
            return array;
        }

        this.map = createArray(0, this.dimensions);

        let maxTunnels = 50,
            maxLength = 8
        let currentRow = Math.floor(Math.random() * this.dimensions),
            currentColumn = Math.floor(Math.random() * this.dimensions);
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        let lastDirection = [],
            randomDirection;

        this.map[currentRow][currentColumn] = 2;
        this.spawn = {
            'x': currentRow,
            'y': currentColumn,
        };
        while (maxTunnels > 0 && this.dimensions && maxLength) {
            do {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
            } while ((randomDirection[0] === -lastDirection[0] &&
                randomDirection[1] === -lastDirection[1]) ||
            (randomDirection[0] === lastDirection[0] &&
                randomDirection[1] === lastDirection[1]));

            let randomLength = Math.ceil(Math.random() * maxLength),
                tunnelLength = 0;


            while (tunnelLength < randomLength) {
                if (((currentRow === 0) && (randomDirection[0] === -1)) ||
                    ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                    ((currentRow === this.dimensions - 1) && (randomDirection[0] === 1)) ||
                    ((currentColumn === this.dimensions - 1) && (randomDirection[1] === 1)))
                    break;
                else {
                    if (!this.map[currentRow][currentColumn])
                        this.map[currentRow][currentColumn] = 1;
                    currentRow += randomDirection[0];
                    currentColumn += randomDirection[1];
                    tunnelLength++;
                }
                if (tunnelLength) {
                    lastDirection = randomDirection;
                    maxTunnels--;
                }
            }
        }
        this.map[currentRow][currentColumn] = 3;
        this.exit = {
            'x': currentRow,
            'y': currentColumn,
        };

        this.freeTunnels = [];
        this.map.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
            if (col) this.freeTunnels.push({x: rowIdx, y: colIdx})
        }));
    }
}