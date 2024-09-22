import * as THREE from "three";


const createAssetsFactory = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // asset factory
    const assets = {
        "grass": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "grass", x, y };
            mesh.position.set(x, -0.5, y);
            return mesh;
        },
        "residential": (x, y, data) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "residential", x, y };
            console.log("residential", {data});
            mesh.scale.set(1, data.height, 1);
            mesh.position.set(x, data.height / 2, y);
            return mesh;
        },
        "commercial": (x, y, data) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "commercial", x, y };
            mesh.scale.set(1, data.height, 1);
            mesh.position.set(x, data.height / 2, y);
            return mesh;
        },
        "industrial": (x, y, data) => {
            const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "industrial", x, y };
            mesh.scale.set(1, data.height, 1);
            mesh.position.set(x, data.height / 2, y);
            return mesh;
        },
        "road": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x444440 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "road", x, y };
            mesh.scale.set(1, 0.1, 1);
            mesh.position.set(x, 0.05, y);
            return mesh;
        }
    };

    return assets;
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
        if (assetId === "road") return assets[assetId](x, y);
        console.log("createAssetInstance", {data});
        return assets[assetId](x, y, data);
    } else {
        console.warn(`Asset Id ${assetId} is not found`)
        return null;
    }
}