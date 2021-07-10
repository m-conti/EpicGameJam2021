const COLORS = {
    '0': 0x000,
    '1': 0xFF0000,
    '2': 0x00FF00,
    '3': 0x0000FF,
}

class Map {
    constructor() {
        this.theme = "";

        this.dimensions = 15;
        this.generateMap();
        this.minimap = this.drawMinimap();
        this.mapContainer = this.drawMap();
    }

    drawMap() {
        let mapContainer = new PIXI.Container();
        for (let x = 0; x < this.dimensions; x++) {
            for (let y = 0; y < this.dimensions; y++) {
                if (this.map[x][y]) {
                    let room = new PIXI.Graphics();

                    room.beginFill(COLORS[this.map[x][y]]);
                    room.drawRect(x * ROOM_SIZE, y * ROOM_SIZE, ROOM_SIZE, ROOM_SIZE);
                    room.endFill();

                    mapContainer.addChild(room);
                }
                // else {
                //     // Else make a borderRoom entity
                //     const borderRoom = new BorderRoom(x, y)
                //     this.borderRooms.push(borderRoom)
                // }
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

                    room.beginFill(COLORS[this.map[x][y]]);
                    room.drawRect(x * 10, y * 10, 10, 10);
                    room.endFill();

                    minimap.addChild(room);
                }
            }
        }
        return minimap;
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
        this.map.forEach((row, rowIdx) => row.forEach((col, colIdx) => { if(col) this.freeTunnels.push({ x: rowIdx, y: colIdx }) }));
    }
}