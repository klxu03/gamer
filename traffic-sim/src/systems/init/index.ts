import ComponentManager from "../../components/componentManager";
import EntityManager from "../../entities/entityManager";
import ArchetypesManager from "../../archetypes/archetypesManager";
import CreateTerrain from "../createEntity/createTerrain";

import rotateCube from "./rotateCube";
import { TickManager } from "../../utils/ticker/tickManager";

/**
 * Initialize the logic and frames for the game
 */
export default function initSystem() {
    // Initialize entities
    EntityManager.getInstance;

    // Initialize components
    ComponentManager.getInstance;

    // Initialize archetypes
    ArchetypesManager.getInstance;

    // Create the terrain block
    const terrainId = CreateTerrain.getInstance.createTerrain(true, 0, 0, 0);

    // Start rotating the cube
    TickManager.getInstance.addDirty(() => {
        rotateCube(terrainId);
        return Date.now();
    });
}
