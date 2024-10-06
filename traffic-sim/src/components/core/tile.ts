import Component from "../component";

class Tile extends Component {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export default Tile;