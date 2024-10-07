import Component from "../component";
import VectorInt from "../../dsa/vector_int";

enum BuildingType {
    HOUSE = 0,
    COMMERCIAL = 1,
    INDUSTRIAL = 2,
}

class Building extends Component {
    level: number;
    maxLevel: number;

    occupants = new VectorInt();
    maxOccupants: number;

    type: BuildingType;

    // TODO Optimize inner array with a bitset
    
    /**
     * 2D array of booleans representing the tiles occupied by the building
     * True means the tile should be occupied by this building
     */
    tilesOccupied: Array<Array<boolean>>;

    x: number;
    y: number;
    z: number;

    constructor(level: number, maxLevel: number, maxOccupants: number, type: BuildingType, tilesOccupied: Array<Array<boolean>>, x: number, y: number, z: number) {
        super();

        this.level = level;
        this.maxLevel = maxLevel;

        this.maxOccupants = maxOccupants;

        this.type = type;

        this.tilesOccupied = tilesOccupied;

        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export { Building, BuildingType };