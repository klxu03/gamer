import { createTile } from "./tile.js";

class City {
    tiles = [];
    citizens = [];
    size = 0;

    // Ensure singleton City class
    constructor(size) {
        if (City.instance) {
            return City.instance;
        }

        City.instance = this;

        this.size = size;

        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);

                column.push(tile);
            }
            this.tiles.push(column);
        }
    }

    /**
     * Update all the buildings in the city
     */
    update() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                this.tiles[x][y].building?.update(this);
            }
        }

        for (const citizen of this.citizens) {
            citizen.update(this);
        }
    }

    /** Static methods */
    static getCity() {
        if (!City.instance) {
            throw new Error("City instance not initialized");
        }

        return City.instance;
    }
}

export default City;