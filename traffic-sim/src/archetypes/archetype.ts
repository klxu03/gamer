import VectorInt from "../dsa/vector_int";

class Archetype {
    public static instance: Archetype;

    /**
     * The components that make up this archetype
     */
    public components: VectorInt;
    
    /**
     * A set of entities that have this archetype
     */
    public set: Set<number>;

    constructor(components: VectorInt) {
        this.components = components;
        this.set = new Set();
    }

    public static get getInstance(): Archetype {
        if (!Archetype.instance) {
            Archetype.instance = new Archetype(new VectorInt());
        }
        return Archetype.instance;
    }
}

export default Archetype;