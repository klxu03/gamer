import * as THREE from "three";


const createAssetsFactory = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // asset factory
    const assets = {
        "grass": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "grass" };
            mesh.position.set(x, -0.5, y);
            return mesh;
        }
    };

    const addBuildings = () => {
        const MAX_BUILDING_HEIGHT = 3;
        const material = new THREE.MeshLambertMaterial({ color: 0x777777 });

        for (let i = 0; i < MAX_BUILDING_HEIGHT; i++) {
            assets[`building-${i}`] = (x, y) => {
                const height = i;
                const mesh = new THREE.Mesh(geometry, material);
                mesh.userData = { id: `building-${i}` };
                mesh.scale.set(1, height, 1);
                mesh.position.set(x, height/2, y);
                return mesh;
            }
        }
    }

    addBuildings();

    return assets;
}

export function createAssetInstance(assetId, x, y) {
    const assets = createAssetsFactory();

    if (assetId in assets) {
        return assets[assetId](x, y);
    } else {
        console.warn(`Asset Id ${assetId} is not found`)
        return null;
    }
}