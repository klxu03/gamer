import * as THREE from 'three';
import Renderer from '../../render';

export default function initLights() {
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

    Renderer.getInstance.scene.add(sun);

    const enableHelper = false;
    if (enableHelper) {
        const helper = new THREE.CameraHelper(sun.shadow.camera);
        Renderer.getInstance.scene.add(helper);
    }
}