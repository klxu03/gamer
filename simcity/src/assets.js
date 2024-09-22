import * as THREE from "three";

const cube = new THREE.BoxGeometry(1, 1, 1);
const loader = new THREE.TextureLoader();

const loadTexture = (url) => {
    const tex = loader.load(url);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    tex.magFilter = THREE.LinearFilter;

    return tex;
}

const textures = {
    "grass": loadTexture("../public/textures/grass.png"),
    "residential": loadTexture("../public/textures/residential.png"),
    "commercial": loadTexture("public/textures/commercial.png"),
    "industrial": loadTexture("public/textures/industrial.png"),
}

const getTopMaterial = () => {
    return new THREE.MeshLambertMaterial({ color: 0x555555 });
}

const getSideMaterial = (textureName) => {
    return new THREE.MeshStandardMaterial({
        map: textures[textureName].clone(),
        roughness: 0.7,
        metalness: 0.2
    });
}

const createAssetsFactory = () => {
    // asset factory
    const assets = {
        "grass": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ map: textures.grass });
            const mesh = new THREE.Mesh(cube, material);
            mesh.userData = { id: "grass", x, y };
            mesh.position.set(x, -0.5, y);
            mesh.receiveShadow = true;
            return mesh;
        },
        "residential": (x, y, data) => {
            return createZoneMesh(x, y, data);
        },
        "commercial": (x, y, data) => {
            return createZoneMesh(x, y, data);
        },
        "industrial": (x, y, data) => {
            return createZoneMesh(x, y, data);
        },
        "road": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x444440 });
            const mesh = new THREE.Mesh(cube, material);
            mesh.userData = { id: "road", x, y };
            mesh.scale.set(1, 0.02, 1);
            mesh.position.set(x, 0.01, y);
            mesh.receiveShadow = true;
            return mesh;
        }
    };

    return assets;
}

const createZoneMesh = (x, y,  data) => {
    const textureName = data.type;

    const topMaterial = getTopMaterial();
    const sideMaterial = getSideMaterial(textureName);
    const materialArray = [
        sideMaterial, // Left side
        sideMaterial, // Right side
        topMaterial, // Top side
        topMaterial, // Bottom side
        sideMaterial, // Back side
        sideMaterial // Front side 
    ];
    const mesh = new THREE.Mesh(cube, materialArray);
    mesh.userData = {x, y};
    mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
    mesh.material.forEach(material => material.map?.repeat.set(1, data.height - 1));
    mesh.position.set(x, (data.height - 0.95) / 4, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

const assets = createAssetsFactory();

/**
 * 
 * @param {*} assetId 
 * @param {*} x 
 * @param {*} y 
 * @param {object} data additional metadata to create the asset 
 * @returns 
 */
export function createAssetInstance(assetId, x, y, data) {
    if (assetId in assets) {
        console.log("createAssetInstance", {data});
        return assets[assetId](x, y, data);
    } else {
        console.warn(`Asset Id ${assetId} is not found`)
        return null;
    }
}