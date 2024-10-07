import CreateTerrain from "../createEntity/createTerrain";

const TERRAIN_SIZE = 10;

export default function initTerrain() {
    for (let x = 0; x < TERRAIN_SIZE; x++) {
        for (let y = 0; y < TERRAIN_SIZE; y++) {
            CreateTerrain.getInstance.createTerrain(true, x, y, -0.05);
        }
    }
}