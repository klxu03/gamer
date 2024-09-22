const buildingFactory = {
    "residential": () => {
        return {
            type: "residential",
            height: 1,
            dirty: true,
            update: function() {
                console.log("updating residential");
                this.dirty = false;
                if (Math.random() < 0.5) {
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
            type: "commercial",
            height: 1,
            dirty: true,
            update: function() {
                this.dirty = false;
                if (Math.random() < 0.5) {
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
            type: "industrial",
            height: 1,
            dirty: true,
            update: function() {
                this.dirty = false;
                if (Math.random() < 0.5) {
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
            type: "road",
            dirty: true,
            update: function() {
                this.dirty = false;
            }
        }
    }
}

export default buildingFactory;