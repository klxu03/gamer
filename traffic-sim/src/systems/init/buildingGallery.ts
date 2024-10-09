import CreateBuilding from "../createEntity/createBuilding";
import { BuildingType } from "../../components/renderable/building";

import * as THREE from 'three-webgpu';
import Renderable from "../../components/renderable";
import RenderManager from "../../utils/renderer/renderManager";

export default function buildingGallery() {
    let buildingType = "residential";
    CreateBuilding.getInstance.createBuilding(1, 3, 4, [], 3, 3, 0, BuildingType.HOUSE, `${buildingType}-C1`);
    CreateBuilding.getInstance.createBuilding(2, 3, 16, [], 4, 3, 0, BuildingType.HOUSE, `${buildingType}-C2`);
    CreateBuilding.getInstance.createBuilding(3, 3, 64, [], 5, 3, 0, BuildingType.HOUSE, `${buildingType}-C3`);

    buildingType = "commercial";
    CreateBuilding.getInstance.createBuilding(1, 3, 12, [], 3, 5, 0, BuildingType.COMMERCIAL, `${buildingType}-C1`);
    CreateBuilding.getInstance.createBuilding(2, 3, 144, [], 4, 5, 0, BuildingType.COMMERCIAL, `${buildingType}-C2`);
    CreateBuilding.getInstance.createBuilding(3, 3, 1296, [], 5, 5, 0, BuildingType.COMMERCIAL, `${buildingType}-C3`);

    buildingType = "industrial";
    CreateBuilding.getInstance.createBuilding(1, 3, 8, [], 3, 7, 0, BuildingType.INDUSTRIAL, `${buildingType}-C1`);
    CreateBuilding.getInstance.createBuilding(2, 3, 64, [], 4, 7, 0, BuildingType.INDUSTRIAL, `${buildingType}-B1`);
    CreateBuilding.getInstance.createBuilding(3, 3, 512, [], 5, 7, 0, BuildingType.INDUSTRIAL, `${buildingType}-A1`);

    const renderable = new Renderable(() => {
        // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
        // Create a solid green material for the sides and bottom
        const greenMaterial = new THREE.MeshLambertMaterial({ color: 0x0b520e }); // Bright green color
        const materials = [
            greenMaterial,
            greenMaterial,
            greenMaterial,
            greenMaterial,
            greenMaterial,
            greenMaterial
        ];

        const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
        mesh.position.set(10, 0.5, 10);

        mesh.castShadow = true;

        return mesh;
    });
    RenderManager.getInstance.addRender(() => {
        renderable.render();

        return new Promise((resolve) => {
            resolve(true);
        });
    });
}