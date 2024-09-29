import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

class AssetManager {
    loader = new THREE.TextureLoader();
    gltfLoader = new GLTFLoader();

    assets = {}

    assetPaths = {
        "grass": loadTexture("../public/textures/grass.png"),
        "residential": loadTexture("../public/textures/residential.png"),
        "commercial": loadTexture("public/textures/commercial.png"),
        "industrial": loadTexture("public/textures/industrial.png"),
    }

    constructor() {

    }
}

export default AssetManager;
