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
    gameWindow.appendChild(renderer.domElement);

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
                const currBuildingId = buildings[x][y]?.userData.id;
                const newBuildingId = city.data[x][y].buildingId;

                // Player removes a building, remove it from the scene
                if (!newBuildingId && currBuildingId) {
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = null;
                }

                // Data model has changed, change mesh
                if (newBuildingId && newBuildingId !== currBuildingId) {
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = createAssetInstance(newBuildingId, x, y);
                    scene.add(buildings[x][y]);
                }
            }
        }
    }

    function setupLights() {
        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2),
            new THREE.DirectionalLight(0xffffff, 3),
            new THREE.DirectionalLight(0xffffff, 1),
            new THREE.DirectionalLight(0xffffff, 0.3)
        ];

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights);
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
    }
    gameWindow.addEventListener("mousedown", onMouseDown);

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