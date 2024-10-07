import * as THREE from 'three';
import Camera from './utils/renderer/camera';
import RenderManager from './utils/renderer/renderManager';
import initSystem from './systems/init';

class Renderer {
    static #instance: Renderer;
    #gameWindow: HTMLElement;
    scene: THREE.Scene;
    #renderer: THREE.WebGLRenderer;
    #camera: THREE.PerspectiveCamera;

    #renderManager: RenderManager;

    constructor() {
        Renderer.#instance = this;
        this.#gameWindow = document.getElementById('render-target')!;
        this.scene = new THREE.Scene();
        this.#renderer = new THREE.WebGLRenderer();
        this.#camera = Camera.getInstance.cameraInstance.camera;
        this.#renderer.setSize(this.#gameWindow.offsetWidth, this.#gameWindow.offsetHeight);
        this.#renderer.setClearColor(0x000000, 0);
        this.#gameWindow.appendChild(this.#renderer.domElement);

        this.#renderManager = RenderManager.getInstance;

        this.#renderer.setAnimationLoop(this.#animate.bind(this));

        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        }, false);

        initSystem();
    }

    #animate() {
        /**
         * Additional Considerations:
Performance Monitoring (Optional):
If you ever need to monitor or display the current FPS for debugging or informational purposes, you can implement an FPS counter by tracking the time between frames. However, for most applications, leveraging requestAnimationFrame as shown is sufficient.
Throttling Updates (Advanced):
In scenarios where certain updates are intensive and you want to throttle them independently of the render loop, you might consider implementing separate timing mechanisms. For now, integrating #update directly into the animate method provides a balanced and efficient approach.
By following this approach, your renderer will efficiently handle updates in sync with the rendering loop, adapting the FPS dynamically based on performance and hardware capabilities.
         */
        this.#update();
        this.#renderer.render(this.scene, this.#camera);
    }

    #update() {
        this.#renderManager.processRender();
    }

    public static get getInstance(): Renderer {
        if (!Renderer.#instance) {
            Renderer.#instance = new Renderer();
        }

        return Renderer.#instance;
    }
}

declare global {
    interface Window {
        renderer: Renderer;
    }
}

window.onload = () => {
    window.renderer = Renderer.getInstance;
}

export default Renderer;