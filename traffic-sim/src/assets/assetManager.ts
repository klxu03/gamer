import * as THREE from 'three';

class AssetManager {
    public static instance: AssetManager;

    #cube: THREE.BoxGeometry;
    #loader: THREE.TextureLoader;
    #textures: Map<string, THREE.Texture>;

    #meshFactory: Map<string, THREE.Mesh>;

    constructor() {
        this.#cube = new THREE.BoxGeometry(1, 1, 1);
        this.#loader = new THREE.TextureLoader();
        this.#textures = new Map();
        this.#meshFactory = new Map();

        this.#initTextures();
        this.#initMeshes();
    }

    #loadTexture(url: string) {
        const texture = this.#loader.load(url);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        return texture;
    }

    #initTextures() {
        this.#textures.set("grass", this.#loadTexture("/textures/grass.png"));
    }

    #initMeshes() {
        const createGrass = () => {
            const material = new THREE.MeshLambertMaterial({ map: this.#textures.get("grass") });
            const mesh = new THREE.Mesh(this.#cube, material);
            mesh.receiveShadow = true;
            return mesh;
        }

        this.#meshFactory.set("grass", createGrass());
    }

    public getMesh(id: string): THREE.Mesh {
        return this.#meshFactory.get(id)!;
    }

    public static get getInstance(): AssetManager {
        if (!AssetManager.instance) {
            AssetManager.instance = new AssetManager();
        }
        return AssetManager.instance;
    }
}

export default AssetManager;