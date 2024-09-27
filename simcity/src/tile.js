import createBuildingFactory from "./buildings.js";

export function createTile(x, y) {
    return {
        /* PROPERTIES */
        x, 
        y,
        terrainId: "grass",
        building: null,

        /* METHODS */
        removeBuilding() {
            this.building = null;
        },
        placeBuilding(buildingType) {
            this.building = createBuildingFactory(buildingType, x, y);
        }
    };
}