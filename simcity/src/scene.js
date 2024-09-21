import * as THREE from "three";
import { createCamera } from "./camera.js";

export function createScene() {
    // Initial scene setup
    const gameWindow = document.getElementById("render-target");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function draw() {
        renderer.render(scene, camera.camera);
    }

    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    function preventContextMenu(event) {
        event.preventDefault();
    }
    gameWindow.addEventListener("contextmenu", preventContextMenu);

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
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        cleanup: () => {
            gameWindow.removeEventListener("contextmenu", preventContextMenu);
            gameWindow.removeEventListener("mousedown", onMouseDown);
            gameWindow.removeEventListener("mouseup", onMouseUp);
            gameWindow.removeEventListener("mousemove", onMouseMove);
        }
    }
}