import Component from "../component";
import VectorInt from "../../dsa/vector_int";
import EntityManager from "../../entities/entityManager";

enum BuildingType {
    HOUSE = 0,
    COMMERCIAL = 1,
    INDUSTRIAL = 2,
}

class Building extends Component {
    static entityManager: EntityManager;

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

    /**
     * Lowest x and y coordinate of this building, (0, 0) of tilesOccupied
     */
    x: number;
    y: number;
    z: number;

    /**
     * The entity ID of the tile that is the origin of this building
     */
    originTile: number;

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

        this.originTile = Building.entityManager.tileManager.get([x, y])!;
    }
}

export { Building, BuildingType };