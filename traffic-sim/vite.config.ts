import config from './config';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
      alias: {
        'three-webgpu': config.usingWebGPU ? '/node_modules/three/build/three.webgpu.js' : '/node_modules/three/build/three.module.js'
      }
    }
});