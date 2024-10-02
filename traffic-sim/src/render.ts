import * as THREE from 'three';
import Camera from './utils/renderer/camera';
class Renderer {
    #gameWindow: HTMLElement;
    #scene: THREE.Scene;
    #renderer: THREE.WebGLRenderer;
    #camera: THREE.PerspectiveCamera;
    #cube: THREE.Mesh | null = null;

    constructor() {
        this.#gameWindow = document.getElementById('render-target')!;
        this.#scene = new THREE.Scene();
        this.#renderer = new THREE.WebGLRenderer();
        this.#camera = Camera.getInstance().cameraInstance.camera;
        this.#renderer.setSize(this.#gameWindow.offsetWidth, this.#gameWindow.offsetHeight);
        this.#renderer.setClearColor(0x000000, 0);
        this.#gameWindow.appendChild(this.#renderer.domElement);

        this.#renderer.setAnimationLoop(this.animate.bind(this));
        this.createCube();

        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        }, false);
    }

    private createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.#cube = new THREE.Mesh(geometry, material);
        this.#scene.add(this.#cube);
    }

    private animate() {
        this.#cube!.rotation.x += 0.01;
        this.#cube!.rotation.y += 0.01;

        this.#renderer.render(this.#scene, this.#camera);
    }
}

declare global {
    interface Window {
        renderer: Renderer;
    }
}

window.onload = () => {
    window.renderer = new Renderer();
}

export default Renderer;