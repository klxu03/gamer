import * as THREE from "three";
import Renderer from "../render";
import Component from "./component";

class Renderable extends Component {
    createdAt: number;

    /**
     * Each renderable entity must implement this method to return a 3D object to be rendered 
     * @returns A 3D object to be rendered
     */
    public render: () => void;

    public mesh: THREE.Object3D;

    /**
     * 
     * @param render A function that returns a 3D object to be rendered
     */
    constructor(render: () => THREE.Object3D) {
        super();

        this.createdAt = Date.now();
        this.mesh = render();
        
        const renderFunction = () => {
            Renderer.getInstance.scene.add(this.mesh);
        }
        this.render = renderFunction;
    }
}

export default Renderable;