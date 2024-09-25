import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createAssetInstance } from "./assets.js";

export function createScene() {
    // Initial scene setup
    const gameWindow = document.getElementById("render-target");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    gameWindow.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = null;
    let onObjectSelected = null;

    let terrain = [];
    let buildings = [];

    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];

        for (let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                const terrainId = city.data[x][y].terrainId;
                const mesh = createAssetInstance(terrainId, x, y);
                scene.add(mesh);
            }
            terrain.push(column);
            buildings.push([...Array(city.size)]);
        }

        setupLights();
    }

    function update(city) {
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                // Building geometry
                const tile = city.data[x][y];
                const existingBuildingMesh = buildings[x][y];

                // Player removes a building, remove it from the scene
                if (!tile.building && existingBuildingMesh) {
                    scene.remove(existingBuildingMesh);
                    buildings[x][y] = null;
                }

                // Data model has changed, change mesh
                if (tile.building && tile.building.dirty) {
                    scene.remove(existingBuildingMesh);
                    buildings[x][y] = createAssetInstance(tile.building.type, x, y, tile.building);
                    scene.add(buildings[x][y]);
                    tile.building.dirty = false;
                }
            }
        }
    }

    function setupLights() {
        const sun = new THREE.DirectionalLight(0xffffff, 2);
        sun.position.set(20, 20, 20);
        sun.castShadow = true;
        sun.shadow.camera.left = -10;
        sun.shadow.camera.right = 10;
        sun.shadow.camera.top = 0;
        sun.shadow.camera.bottom = -10;
        sun.shadow.mapSize.width = 1024; // quality of shadow, can make smaller
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50;

        const lights = [
            new THREE.AmbientLight(0xffffff, 0.3),
            sun,
        ];

        scene.add(...lights);

        // const helper = new THREE.CameraHelper(sun.shadow.camera);
        // scene.add( helper );
    }

    function draw() {
        renderer.render(scene, camera.camera);
    }

    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    gameWindow.addEventListener("contextmenu", (event) => event.preventDefault(), false);

    function onMouseDown(event) {
        console.log("mouse down", event.button);
        camera.onMouseDown(event);

        if (event.button !== 0) return;
         
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        // Update the camera's world matrix 
        camera.camera.updateMatrixWorld();
        
        raycaster.setFromCamera(mouse, camera.camera);

        let intersections = raycaster.intersectObjects(scene.children, false);

        if (intersections.length > 0) {
            console.log("intersections", selectedObject, intersections[0].object);
            if (selectedObject) {
                try {
                    selectedObject.material.emissive.setHex(0);
                } catch (error) {
                    console.error('An error occurred while setting the emissive color:', error);
                }
            } 
            selectedObject = intersections[0].object;
            selectedObject.material.emissive.setHex(0x555555);

            console.log("selected obj:", selectedObject.userData);

            if (this.onObjectSelected) {
                this.onObjectSelected(selectedObject);
            } else {
                console.log("onObjectSelected is not set");
            }
        } else {
            console.log("no intersection from left click");
        }
    }

    function onMouseUp(event) {
        console.log("mouse up", event.button);
        camera.onMouseUp(event);
    }
    gameWindow.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {
        console.log("mouse move");
        camera.onMouseMove(event);
    }
    gameWindow.addEventListener("mousemove", onMouseMove);

    return {
        onObjectSelected,
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        cleanup: () => {
            gameWindow.removeEventListener("contextmenu", (event) => event.preventDefault(), false);
            gameWindow.removeEventListener("mousedown", onMouseDown);
            gameWindow.removeEventListener("mouseup", onMouseUp);
            gameWindow.removeEventListener("mousemove", onMouseMove);
        }
    }
}