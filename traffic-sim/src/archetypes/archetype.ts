import VectorInt from "../dsa/vector_int";

class Archetype {
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
}

export default Archetype;