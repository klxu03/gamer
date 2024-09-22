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
        "residential": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "residential", x, y };
            mesh.position.set(x, 0.5, y);
            return mesh;
        },
        "commercial": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "commercial", x, y };
            mesh.position.set(x, 0.5, y);
            return mesh;
        },
        "industrial": (x, y) => {
            const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { id: "industrial", x, y };
            mesh.position.set(x, 0.5, y);
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

    const addBuildings = () => {
        const MAX_BUILDING_HEIGHT = 3;

        const buildingColors = [-1, 0xff0000, 0x00ff22, 0x0000ff];

        for (let i = 1; i <= MAX_BUILDING_HEIGHT; i++) {
            console.log("creating building", i);
            assets[`building-${i}`] = (x, y) => {
                const height = i;
                const material = new THREE.MeshLambertMaterial({ color: buildingColors[i] });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.userData = { id: `building-${i}`, x, y };
                mesh.scale.set(1, height, 1);
                mesh.position.set(x, height/2, y);
                return mesh;
            }
        }
    }

    addBuildings();

    return assets;
}

const assets = createAssetsFactory();

export function createAssetInstance(assetId, x, y) {
    if (assetId in assets) {
        return assets[assetId](x, y);
    } else {
        console.warn(`Asset Id ${assetId} is not found`)
        return null;
    }
}