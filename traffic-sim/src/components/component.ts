class Component {
    /**
     * An array of entities, indexed by entity ID, and value is the component value/state
     */
    entities: Array<Component | null>;

    constructor() {
        this.entities = new Array();
    }
}

export default Component;