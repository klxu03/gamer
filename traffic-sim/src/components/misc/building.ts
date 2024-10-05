import Component from "../component";
import VectorInt from "../../dsa/vector_int";

enum BuildingType {
    HOUSE = 0,
    COMMERCIAL = 1,
    INDUSTRIAL = 2,
}

class Building extends Component {
    height: number;
    maxHeight: number;

    occupants = new VectorInt();
    maxOccupants: number;

    type: BuildingType;

    constructor(height: number, maxHeight: number, maxOccupants: number, type: BuildingType) {
        super();

        this.height = height;
        this.maxHeight = maxHeight;

        this.maxOccupants = maxOccupants;

        this.type = type;
    }
}

export default Building;