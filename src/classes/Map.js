const COLORS = {
    '0': 0x000,
    '1': 0xFF0000,
    '2': 0xffffff,
    '3': 0x00ff00,
}

class Map {
    constructor(theme) {
        this.theme = "";

        this.dimensions = 15;
        this.generateMap();
        this.minimap = this.drawMap();
    }

    drawMap() {
        let minimap = new PIXI.Container();
        for (let x = 0; x < this.dimensions; x++) {
            for (let y = 0; y < this.dimensions; y++) {
                if (this.map[x][y]) {
                    let block = new PIXI.Graphics();

                    block.beginFill(COLORS[this.map[x][y]]);
                    block.drawRect(x * 10, y * 10, 10, 10);
                    block.endFill();

                    minimap.addChild(block);
                }
            }
        }
        return minimap;
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
    }
}