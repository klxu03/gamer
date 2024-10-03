import * as THREE from "three";
import Component from "./component";

class Renderable extends Component {
    createdAt: number;

    /**
     * Each renderable entity must implement this method to return a 3D object to be rendered 
     * @returns A 3D object to be rendered
     */
    render: () => THREE.Object3D;

    /**
     * 
     * @param render A function that returns a 3D object to be rendered
     */
    constructor(render: () => THREE.Object3D) {
        super();

        this.createdAt = Date.now();
        this.render = render;
    }
}

export default Renderable;