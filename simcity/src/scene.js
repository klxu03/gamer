import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createAssetInstance } from "./assets.js";
import { globalState } from "./state/stateManager.js";

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

    let isDragging = false;

    // Event Handler Functions
    function onMouseDown(event) {
        console.log("mouse down", event.button);

        isDragging = true;
        if (globalState.getActiveToolType() === "pointer") {
            camera.onMouseDown(event);
        } else {
            if (event.button !== 0) return;

            placeBuilding.bind(this)(event);
        }
    }

    function onMouseUp(event) {
        console.log("mouse up", event.button);

        isDragging = false;
        const activeTool = globalState.getActiveToolType();
        if (activeTool === "pointer" && event.button === 0) {
            handlePointerSelection(event);
        } 
        camera.onMouseUp(event);
    }

    function onMouseMove(event) {
        const activeTool = globalState.getActiveToolType();
        if (activeTool !== "pointer" && isDragging) {
            placeBuilding.bind(this)(event);
        } else if (activeTool === "pointer" && isDragging) {
            camera.onMouseMove(event);
        }
    }

    function getNewSelectedObject(event) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        // Update the camera's world matrix 
        camera.camera.updateMatrixWorld();
        
        raycaster.setFromCamera(mouse, camera.camera);

        let intersections = raycaster.intersectObjects(scene.children, false);

        if (intersections.length === 0) return null;
        return intersections[0].object;
    }

    function unselectObject() {
        try {
            selectedObject.material.emissive.setHex(0);
        } catch (ignored) {}
    }

    function handlePointerSelection(event) {
        console.log("handlePointerSelection");
        const newSelectedObject = getNewSelectedObject(event);

        if (newSelectedObject) {
            if (globalState.getActiveToolType() === "pointer") {
                unselectObject();
            }

            newSelectedObject.material.emissive.setHex(0x555555);
            console.log("selected obj:", newSelectedObject.userData);

            selectedObject = newSelectedObject;
        } else {
            console.log("no intersection from left click");
        }
    }

    function placeBuilding(event) {
        const newSelectedObject = getNewSelectedObject(event);

        if (newSelectedObject) {
            console.log("new selected object", newSelectedObject);

            // TODO: bound this to the one in onMouseDown
            if (this.onObjectSelected) {
                this.onObjectSelected(newSelectedObject);
            } else {
                console.log("onObjectSelected is not set");
            }

            selectedObject = newSelectedObject;
        } else {
            console.log("no intersection from left click");
        }
    }

    gameWindow.addEventListener("contextmenu", (event) => event.preventDefault(), false);
    gameWindow.addEventListener("mousedown", onMouseDown);
    gameWindow.addEventListener("mouseup", onMouseUp);
    gameWindow.addEventListener("mousemove", onMouseMove);

    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];

        for (let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                const terrainId = city.tiles[x][y].terrainId;
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
                const tile = city.tiles[x][y];
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
        // scene.add(helper);
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

    function cleanup() {
        gameWindow.removeEventListener("contextmenu", (event) => event.preventDefault(), false);
        gameWindow.removeEventListener("mousedown", onMouseDown);
        gameWindow.removeEventListener("mouseup", onMouseUp);
        gameWindow.removeEventListener("mousemove", onMouseMove);
    }

    return {
        onObjectSelected,
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        unselectObject,
        cleanup,
    }
}