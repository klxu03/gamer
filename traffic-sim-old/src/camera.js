import * as THREE from "three";
import { globalState } from "./state/stateManager.js";

export function createCamera(gameWindow) {
    const DEG2RAD = Math.PI / 180;

    const Y_AXIS = new THREE.Vector3(0, 1, 0);

    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    const MIN_CAMERA_RADIUS = 5;
    const MAX_CAMERA_RADIUS = 20;
    const MIN_CAMERA_ELEVATION = 10;
    const MAX_CAMERA_ELEVATION = 90;

    const ROTATION_SENSITIVITY = 0.5;
    const ZOOM_SENSITIVITY = 0.02;
    const PAN_SENSITIVITY = 0.01;

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    let cameraOrigin = new THREE.Vector3();
    let cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2;
    let cameraAzimuth = 135;
    let cameraElevation = 45;
    let prevMouseX = 0;
    let prevMouseY = 0;
    updateCameraPosition();

    function onMouseMove(event) {
        const dX = event.clientX - prevMouseX;
        const dY = event.clientY - prevMouseY;

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;

        // Big moves are probably a jump
        if (Math.abs(dX) > 10 || Math.abs(dY) > 10) {
            return;
        }

        // Handles rotation of the camera
        if (globalState.getMouseDown() === LEFT_MOUSE_BUTTON) {
            cameraAzimuth += -dX * ROTATION_SENSITIVITY;
            cameraElevation += dY * ROTATION_SENSITIVITY;
            cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
            updateCameraPosition();
        }

        // Handles panning of the camera
        if (globalState.getMouseDown() === MIDDLE_MOUSE_BUTTON) {
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            cameraOrigin.add(forward.multiplyScalar(dY * -PAN_SENSITIVITY));
            cameraOrigin.add(left.multiplyScalar(dX * -PAN_SENSITIVITY));
            updateCameraPosition();
        }

        // Handles the zoom of the camera
        if (globalState.getMouseDown() === RIGHT_MOUSE_BUTTON) {
            cameraRadius += dY * ZOOM_SENSITIVITY;
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
            updateCameraPosition();
        }
    }

    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.add(cameraOrigin);
        camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    return {
        camera,
        onMouseMove
    }
}