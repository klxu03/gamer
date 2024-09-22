export function createCity(size) {
    const data = []; // 2D array of size x size of city size

    initialize(); 

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);

                column.push(tile);
            }
            data.push(column);
        }
    }

    function update() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                data[x][y].building?.update();
            }
        }
    }

    return {
        size,
        data,
        update
    }
}

const createTile = (x, y) => {
    return {
        x, 
        y,
        terrainId: "grass",
        building: null
    };
}