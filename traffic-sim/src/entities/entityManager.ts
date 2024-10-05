import ComponentManager from "../components/componentManager";
import ArchetypesManager from "../archetypes/archetypesManager";
import VectorInt from "../dsa/vector_int";

class EntityManager {
    maxEntityCount: number;
    availableEntities: Set<number>;

    constructor() {
        this.maxEntityCount = 0;
        this.availableEntities = new Set();
    }

    public createEntity(): number {
        if (this.availableEntities.size > 0) {
            const entity = this.availableEntities.values().next().value;
            this.availableEntities.delete(entity);
            return entity;
        }

        // add a new entity index to all components
        ComponentManager.getInstance.components.forEach((component) => {
            component.entities.push(null);
        });

        // add a new entity index to archetypesManager
        ArchetypesManager.getInstance.entities.push(new VectorInt());

        return this.maxEntityCount++;
    }

    public deleteEntity(entity: number) {
        this.availableEntities.add(entity);

        // get the components this entity had
        const components = ArchetypesManager.getInstance.entities[entity];

        // set all components for this entity to null
        for (let i = 0; i < components.size; i++) {
            const component = components.get(i);
            ComponentManager.getInstance.components[component].entities[entity] = null;
        }

        // remove the entity index from archetypesManager
        ArchetypesManager.getInstance.removeEntity(ArchetypesManager.getInstance.getArchetype(components), entity);
    }
}

export default EntityManager;