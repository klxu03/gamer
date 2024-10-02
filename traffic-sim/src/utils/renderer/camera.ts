import OrbitalCamera from "./orbitalCamera";
import { MouseButton, InputManager } from "../../input";
class Camera {
    static #instance: Camera;
    public cameraInstance: OrbitalCamera;
    private prevMouseX: number = 0;
    private prevMouseY: number = 0;

    private constructor(gameWindow: HTMLElement) {
        // TODO: Possibly introduce VR camera support here
        this.cameraInstance = new OrbitalCamera(gameWindow);

        window.addEventListener("mousemove", this.#onMouseMove.bind(this));
        window.addEventListener("wheel", this.#onScroll.bind(this));
    }

    #onMouseMove(event: MouseEvent) {
        const dX = event.clientX - this.prevMouseX;
        const dY = event.clientY - this.prevMouseY;

        this.prevMouseX = event.clientX;
        this.prevMouseY = event.clientY;

        // Ignore jumps
        if (Math.abs(dX) > 10 || Math.abs(dY) > 10) {
            return;
        }

        if (InputManager.getInstance().mouseDown === MouseButton.LEFT) {
            this.cameraInstance.handleRotation(dX, dY);
        }

        if (InputManager.getInstance().mouseDown === MouseButton.RIGHT) {
            this.cameraInstance.handlePanning(dX, dY);
        }
    }

    #onScroll(event: WheelEvent) {
        this.cameraInstance.handleZoom(-event.deltaY);
        event.preventDefault();
    }

    public static getInstance(): Camera {
        if (!Camera.#instance) {
            const gameWindow = document.getElementById('render-target')!;
            Camera.#instance = new Camera(gameWindow);
        }
        return Camera.#instance;
    }
}

export default Camera;