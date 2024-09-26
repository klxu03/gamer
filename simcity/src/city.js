import { createTile } from "./tile.js";

export function createCity(size) {
    const tiles = []; // 2D array of size x size of city size
    const citizens = [];

    initialize(); 

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);

                column.push(tile);
            }
            tiles.push(column);
        }
    }

    function update() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                tiles[x][y].building?.update(this);
            }
        }
    }

    return {
        size,
        tiles,
        citizens,
        update
    }
}