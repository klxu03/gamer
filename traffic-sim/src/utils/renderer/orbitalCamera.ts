import * as THREE from "three";

const DEG2RAD = Math.PI / 180;

const Y_AXIS = new THREE.Vector3(0, 1, 0);

const CAMERA_CONFIG = {
    MIN_CAMERA_RADIUS: 5,
    MAX_CAMERA_RADIUS: 20,
    MIN_CAMERA_ELEVATION: 10,
    MAX_CAMERA_ELEVATION: 90,
    ROTATION_SENSITIVITY: 0.5,
    ZOOM_SENSITIVITY: 0.02,
    PAN_SENSITIVITY: 0.01,
};

const CAMERA_DEFAULT = {
    RADIUS: (CAMERA_CONFIG.MAX_CAMERA_RADIUS + CAMERA_CONFIG.MIN_CAMERA_RADIUS) / 2,
    AZIMUTH: 135,
    ELEVATION: 45,
};

class OrbitalCamera {
    public camera: THREE.PerspectiveCamera;
    public origin: THREE.Vector3;
    public radius: number;
    public azimuth: number;
    public elevation: number;

    constructor(gameWindow: HTMLElement) {
        this.camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
        this.origin = new THREE.Vector3(0, 0, 0);
        this.radius = CAMERA_DEFAULT.RADIUS;
        this.azimuth = CAMERA_DEFAULT.AZIMUTH;
        this.elevation = CAMERA_DEFAULT.ELEVATION;

        this.#updateCameraPosition();

        this.camera.position.set(20, 10, 20);
        this.camera.lookAt(this.origin);
    }

    #updateCameraPosition() {
        this.camera.position.x = this.radius * Math.sin(this.azimuth * DEG2RAD) * Math.cos(this.elevation * DEG2RAD);
        this.camera.position.y = this.radius * Math.sin(this.elevation * DEG2RAD);
        this.camera.position.z = this.radius * Math.cos(this.azimuth * DEG2RAD) * Math.cos(this.elevation * DEG2RAD);
        this.camera.position.add(this.origin);
        this.camera.lookAt(this.origin);
        this.camera.updateMatrix();
    }

    handleRotation(dX: number, dY: number) {
        this.azimuth += -dX * CAMERA_CONFIG.ROTATION_SENSITIVITY;
        this.elevation += dY * CAMERA_CONFIG.ROTATION_SENSITIVITY;
        this.elevation = Math.min(CAMERA_CONFIG.MAX_CAMERA_ELEVATION, Math.max(CAMERA_CONFIG.MIN_CAMERA_ELEVATION, this.elevation));
        this.#updateCameraPosition();
    }

    handlePanning(dX: number, dY: number) {
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, this.azimuth * DEG2RAD);
        const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, this.azimuth * DEG2RAD);
        this.origin.add(forward.multiplyScalar(dY * -CAMERA_CONFIG.PAN_SENSITIVITY));
        this.origin.add(left.multiplyScalar(dX * -CAMERA_CONFIG.PAN_SENSITIVITY));
        this.#updateCameraPosition();
    }

    handleZoom(dY: number) {
        this.radius += dY * CAMERA_CONFIG.ZOOM_SENSITIVITY;
        this.radius = Math.min(CAMERA_CONFIG.MAX_CAMERA_RADIUS, Math.max(CAMERA_CONFIG.MIN_CAMERA_RADIUS, this.radius));
        this.#updateCameraPosition();
    }
}

export default OrbitalCamera;