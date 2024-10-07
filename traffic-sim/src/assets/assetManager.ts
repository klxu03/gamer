import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AssetManagerUtils from './assetManagerUtils';
import models from './models.json';

type ModelOptions = {
  recieveShadow?: boolean;
  castShadow?: boolean;
  rotation?: number;
  scale?: number;
}

class AssetManager {
  static #instance: AssetManager;

  #assetManagerUtils: AssetManagerUtils;

  public cube: THREE.BoxGeometry;
  public textures: Map<string, THREE.Texture>;

  #meshFactory: Map<string, THREE.Object3D>;

  #textureLoader: THREE.TextureLoader;
  #gltfLoader = new GLTFLoader();

  constructor() {
    AssetManager.#instance = this;
    this.#assetManagerUtils = new AssetManagerUtils();

    this.cube = new THREE.BoxGeometry(1, 1, 1);
    this.#textureLoader = new THREE.TextureLoader();
    this.textures = new Map();
    this.#meshFactory = new Map();

    this.#initTextures();
    this.#initMeshes();
  }

  #loadTexture(url: string) {
    const texture = this.#textureLoader.load(url);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return texture;
  }

  #loadModel(name: string, url: string, options: ModelOptions) {
    const recieveShadow = options.recieveShadow ?? true;
    const castShadow = options.castShadow ?? true;
    const rotation = options.rotation ?? 0;
    const scale = options.scale ?? 1;

    this.#gltfLoader.load(url, (glb) => {
      let mesh = glb.scene;

      mesh.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material = new THREE.MeshLambertMaterial({
            map: this.textures.get("base"),
            specularMap: this.textures.get("specular"),
          })

          obj.receiveShadow = recieveShadow;
          obj.castShadow = castShadow;
        }

        mesh.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0);
        mesh.scale.set(scale / 30, scale / 30, scale / 30);
      })

      mesh.name = name;

      console.log("finished loading model", name, "mesh is ", mesh);
      this.#meshFactory.set(name, mesh);
    });
  }

  #initTextures() {
    this.textures.set("grass", this.#loadTexture("/textures/grass.png"));
    this.textures.set("base", this.#loadTexture("/textures/base.png"));
    this.textures.set("specular", this.#loadTexture("/textures/specular.png"));
  }

  #initMeshes() {
    this.#meshFactory.set("grass", this.#assetManagerUtils.createGrass());
  }

  public initModels() {
    for (const [key, value] of Object.entries(models)) {
      this.#loadModel(key, value.url, value.options);
    }
  }

  public getMesh(id: string): THREE.Object3D {
    return this.#meshFactory.get(id)!;
  }

  public static get getInstance(): AssetManager {
    if (!AssetManager.#instance) {
      AssetManager.#instance = new AssetManager();
    }
    return AssetManager.#instance;
  }
}

export default AssetManager;