import Component from "../component";
import Entity from "../../entities/entity";

enum BuildingType {
    HOUSE = 0,
    COMMERCIAL = 1,
    INDUSTRIAL = 2,
}

class Building extends Component {
    height: number;
    maxHeight: number;

    occupants: Entity[];
    maxOccupants: number;

    type: BuildingType;

    constructor(height: number, maxHeight: number, maxOccupants: number, type: BuildingType) {
        super();

        this.height = height;
        this.maxHeight = maxHeight;

        this.occupants = [];
        this.maxOccupants = maxOccupants;

        this.type = type;
    }
}

export default Building;