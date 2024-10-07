import ComponentManager from "../../components/componentManager";
import EntityManager from "../../entities/entityManager";
import ArchetypesManager from "../../archetypes/archetypesManager";

import initTerrain from "./initTerrain";
import initLights from "./initLights";
import AssetManager from "../../assets/assetManager";

import CreateBuilding from "../createEntity/createBuilding";
import rotateCube from "./rotateCube";
import { TickManager } from "../../utils/ticker/tickManager";

import RenderManager from "../../utils/renderer/renderManager";

/**
 * Initialize the logic and frames for the game
 */
export default async function initSystem() {
    // Initialize entityManager, componentManager, archetypesManager
    EntityManager.getInstance;
    ComponentManager.getInstance;
    ArchetypesManager.getInstance;

    await AssetManager.getInstance.initModels();
    console.log("All models loaded");

    RenderManager.getInstance.addRender(() => {
        initTerrain();

        return new Promise((resolve) => {
            resolve(true);
        });
    });
    RenderManager.getInstance.addRender(() => {
        initLights();

        return new Promise((resolve) => {
            resolve(true);
        });
    });

    RenderManager.getInstance.addRender(() => {
        // Placing home after 2 seconds
        CreateBuilding.getInstance.createBuilding(3, 3, 0);

        return new Promise((resolve) => {
            resolve(true);
        });
    });

    // Start rotating the cube
    // TickManager.getInstance.addDirty(() => {
    //     rotateCube(44);
    //     return Date.now();
    // });
}
