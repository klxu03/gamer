export default function createBuildingFactory(buildingType) {
    switch (buildingType) {
        case "residential":
            return createResidentialBuilding();
        case "commercial":
            return createCommercialBuilding();
        case "industrial":
            return createIndustrialBuilding();
        case "road":
            return createRoad();
        default:
            console.error(`${buildingType} is not a recognized building type`);
    }

    function createResidentialBuilding() {
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
    }

    function createCommercialBuilding() {
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
    }

    function createIndustrialBuilding() {
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
    }

    function createRoad() {
        return {
            type: "road",
            dirty: true,
            update: function() {
                this.dirty = false;
            }
        }
    }
}