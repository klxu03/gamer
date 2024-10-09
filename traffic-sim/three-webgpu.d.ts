import config from './config';

declare module 'three-webgpu' {
    export * from 'three';

    if (config.usingWebGPU) {
        // import * as THREE from 'three';
        export class WebGPURenderer extends THREE.WebGLRenderer {}
    }
}