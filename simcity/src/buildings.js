const buildingFactory = {
    "residential": () => {
        return {
            id: "residential",
            height: 1,
            dirty: true,
            update: function() {
                console.log("updating residential");
                this.dirty = false;
                if (Math.random() < 0.005) {
                    if (this.height < 5) {
                        this.height++;
                        this.dirty = true;
                    }
                }
            }
        }
    },
    "commercial": () => {
        return {
            id: "commercial",
            height: 1,
            dirty: true,
            update: function() {
                this.dirty = false;
                if (Math.random() < 0.005) {
                    if (this.height < 5) {
                        this.height++;
                        this.dirty = true;
                    }
                }
            }
        }
    },
    "industrial": () => {
        return {
            id: "industrial",
            height: 1,
            dirty: true,
            update: function() {
                this.dirty = false;
                if (Math.random() < 0.005) {
                    if (this.height < 5) {
                        this.height++;
                        this.dirty = true;
                    }
                }
            } 
        }
    },
    "road": () => {
        return {
            id: "road",
            dirty: true,
            update: function() {
                this.dirty = false;
            }
        }
    }
}

export default buildingFactory;