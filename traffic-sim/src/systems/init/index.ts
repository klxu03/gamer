import ComponentManager from "../../components/componentManager";
import EntityManager from "../../entities/entityManager";
import ArchetypesManager from "../../archetypes/archetypesManager";

import initTerrain from "./initTerrain";
import initLights from "./initLights";
import AssetManager from "../../assets/assetManager";
import RenderManager from "../../utils/renderer/renderManager";

import CreateBuilding from "../createEntity/createBuilding";
import rotateCube from "./rotateCube";
import { TickManager } from "../../utils/ticker/tickManager";

import { BuildingType } from "../../components/renderable/building";

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
        CreateBuilding.getInstance.createBuilding(3, 3, 0, BuildingType.HOUSE, "residential-A1");
        CreateBuilding.getInstance.createBuilding(4, 3, 0, BuildingType.HOUSE, "residential-A2");
        CreateBuilding.getInstance.createBuilding(5, 3, 0, BuildingType.HOUSE, "residential-A3");

        CreateBuilding.getInstance.createBuilding(3, 5, 0, BuildingType.HOUSE, "residential-B1");
        CreateBuilding.getInstance.createBuilding(4, 5, 0, BuildingType.HOUSE, "residential-B2");
        CreateBuilding.getInstance.createBuilding(5, 5, 0, BuildingType.HOUSE, "residential-B3");

        CreateBuilding.getInstance.createBuilding(3, 7, 0, BuildingType.HOUSE, "residential-C1");
        CreateBuilding.getInstance.createBuilding(4, 7, 0, BuildingType.HOUSE, "residential-C2");
        CreateBuilding.getInstance.createBuilding(5, 7, 0, BuildingType.HOUSE, "residential-C3");

        return new Promise((resolve) => {
            resolve(true);
        });
    });
}
