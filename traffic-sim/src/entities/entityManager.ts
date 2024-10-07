import ComponentManager from "../components/componentManager";
import ArchetypesManager from "../archetypes/archetypesManager";
import VectorInt from "../dsa/vector_int";

class EntityManager {
    static #instance: EntityManager;

    maxEntityCount: number;
    availableEntities: Set<number>;

    #componentManager: ComponentManager;
    #archetypesManager: ArchetypesManager;

    constructor() {
        EntityManager.#instance = this;
        this.maxEntityCount = 0;
        this.availableEntities = new Set();

        this.#componentManager = ComponentManager.getInstance;
        this.#archetypesManager = ArchetypesManager.getInstance;
    }

    public createEntity(): number {
        if (this.availableEntities.size > 0) {
            const entity = this.availableEntities.values().next().value;
            this.availableEntities.delete(entity);
            return entity;
        }

        // add a new entity index to all components
        this.#componentManager.componentList.forEach((component) => {
            component.push(null);
        });

        // add a new entity index to archetypesManager
        this.#archetypesManager.entities.push(new VectorInt());

        return this.maxEntityCount++;
    }

    public deleteEntity(entity: number) {
        this.availableEntities.add(entity);

        // get the components this entity had
        const components = this.#archetypesManager.entities[entity];

        // set all components for this entity to null
        for (let i = 0; i < components.size; i++) {
            const component = components.get(i);
            this.#componentManager.componentList[component][entity] = null;
        }

        // remove the entity index from archetypesManager
        this.#archetypesManager.removeEntity(this.#archetypesManager.getArchetype(components), entity);
    }

    public static get getInstance(): EntityManager {
        if (!EntityManager.#instance) {
            EntityManager.#instance = new EntityManager();
        }

        return EntityManager.#instance;
    }
}

export default EntityManager;