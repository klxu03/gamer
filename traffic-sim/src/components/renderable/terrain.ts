import Component from "../component";

class Terrain extends Component {
    /**
     * Whether you can build on this terrain
     */
    isDevelopable: boolean;
    constructor(isDevelopable: boolean) {
        super();
        this.isDevelopable = isDevelopable;
    }
}

export default Terrain;