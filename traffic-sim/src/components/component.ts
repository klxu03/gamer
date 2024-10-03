import Entity from "../entities/entity";

class Component {
    entities: Map<number, Entity>;

    constructor() {
        this.entities = new Map();
    }
}

export default Component;