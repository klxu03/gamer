import * as THREE from "three";
import AssetManager from "./assetManager";

class AssetManagerUtils {
    #assetManager: AssetManager;

    constructor() {
        this.#assetManager = AssetManager.getInstance;
    }

    public createGrass() {
        // Create the grass texture material for the top face
        const grassMaterial = new THREE.MeshLambertMaterial({ map: this.#assetManager.textures.get("grass") });

        // Create a solid green material for the sides and bottom
        const greenMaterial = new THREE.MeshLambertMaterial({ color: 0x0b520e }); // Bright green color

        // Create an array of materials for the cube
        const materials = [
            greenMaterial,
            greenMaterial,
            grassMaterial,
            greenMaterial,
            greenMaterial,
            greenMaterial
        ];

        // Create the mesh with the cube geometry and the array of materials
        const mesh = new THREE.Mesh(this.#assetManager.cube.clone().scale(1, 0.1, 1), materials);
        mesh.receiveShadow = true;
        mesh.name = "grass";

        return mesh;
    }

    public createGrid() {
        // Create the grass texture material for the top face
        const gridMaterial = new THREE.MeshLambertMaterial({ map: this.#assetManager.textures.get("grid") });

        // Create a solid green material for the sides and bottom
        const greenMaterial = new THREE.MeshLambertMaterial({ color: 0x0b520e }); // Bright green color

        // Create an array of materials for the cube
        const materials = [
            greenMaterial,
            greenMaterial,
            gridMaterial,
            greenMaterial,
            greenMaterial,
            greenMaterial
        ];

        // Create the mesh with the cube geometry and the array of materials
        const mesh = new THREE.Mesh(this.#assetManager.cube.clone().scale(1, 0.1, 1), materials);
        mesh.receiveShadow = true;
        mesh.name = "grid";

        return mesh;
    }
}

export default AssetManagerUtils;