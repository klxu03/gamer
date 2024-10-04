import Component from "../component";

class Tile extends Component {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
    }
}

export default Tile;