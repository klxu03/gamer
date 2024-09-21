import * as THREE from "three";

export function createCamera(gameWindow) {
    const DEG2RAD = Math.PI / 180;

    const Y_AXIS = new THREE.Vector3(0, 1, 0);

    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;
    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;

    const MIN_CAMERA_RADIUS = 2;
    const MAX_CAMERA_RADIUS = 10;
    const MIN_CAMERA_ELEVATION = 30;
    const MAX_CAMERA_ELEVATION = 90;

    const ROTATION_SENSITIVITY = 0.5;
    const ZOOM_SENSITIVITY = 0.02;
    const PAN_SENSITIVITY = 0.01;

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    let cameraOrigin = new THREE.Vector3();
    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = MIN_CAMERA_ELEVATION;
    let prevMouseX = 0;
    let prevMouseY = 0;
    updateCameraPosition();

    function onMouseDown(event) {
        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = true;
        } else if (event.button === MIDDLE_MOUSE_BUTTON) {  
            isMiddleMouseDown = true;
        } else if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = true;
        }
    }

    function onMouseUp(event) {
        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = false;
        } else if (event.button === MIDDLE_MOUSE_BUTTON) {  
            isMiddleMouseDown = false;
        } else if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = false;
        } 
    }

    function onMouseMove(event) {
        const dX = event.clientX - prevMouseX;
        const dY = event.clientY - prevMouseY;

        // Handles rotation of the camera
        if (isLeftMouseDown) {
            cameraAzimuth += -dX * ROTATION_SENSITIVITY;
            cameraElevation += dY * ROTATION_SENSITIVITY;
            cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
            updateCameraPosition();
        }

        // Handles panning of the camera
        if (isMiddleMouseDown) {
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            cameraOrigin.add(forward.multiplyScalar(dY * -PAN_SENSITIVITY));
            cameraOrigin.add(left.multiplyScalar(dX * -PAN_SENSITIVITY));
            updateCameraPosition();
        }

        // Handles the zoom of the camera
        if (isRightMouseDown) {
            cameraRadius += dY * ZOOM_SENSITIVITY;
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
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
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}