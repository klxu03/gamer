export function createCity(size) {
    const data = []; // 2D array of size x size of city size

    initialize(); 

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = {
                    x, 
                    y,
                    building: null,
                    update() {
                        if (Math.random() < 0.01) {
                            if (this.building === null) {
                                this.building = "building-1";
                            } else {
                                const height = Number(this.building.slice(-1));
                                if (height < 4) {
                                    this.building = `building-${height + 1}`;
                                }
                            }
                        }
                    }
                };

                column.push(tile);
            }
            data.push(column);
        }
    }

    function update() {
        console.log("Updating city");
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                data[x][y].update();
            }
        }
    }

    return {
        size,
        data,
        update
    }
}