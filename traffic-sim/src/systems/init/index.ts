import ComponentManager from "../../components/componentManager";
import EntityManager from "../../entities/entityManager";
import ArchetypesManager from "../../archetypes/archetypesManager";

import initTerrain from "./initTerrain";
import initLights from "./initLights";
import AssetManager from "../../assets/assetManager";
import RenderManager from "../../utils/renderer/renderManager";

import rotateCube from "./rotateCube";
import buildingGallery from "./buildingGallery";
import { TickManager } from "../../utils/ticker/tickManager";

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
        buildingGallery("commercial");

        return new Promise((resolve) => {
            resolve(true);
        });
    });
}
