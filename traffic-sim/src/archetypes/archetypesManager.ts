import VectorInt from "../dsa/vector_int";
import Archetype from "./archetype";

class ArchetypesManager {
    public static instance: ArchetypesManager;

    /**
     * A map of archetypes, keyed by the components that make up the archetype in ascending order
     */
    #archetypes: Map<VectorInt, Archetype>;

    /**
     * A map where key is a single component ID, and the value is an array of archetypes that have that component
     */
    #archetypeBase: Array<Array<Archetype>>;

    /**
     * An array of entities, indexed by entity ID that represents which archetype they are a part of
     */
    public entities: Array<VectorInt>;

    constructor() {
        this.#archetypes = new Map();
        this.entities = new Array();
        this.#archetypeBase = new Array();
    }

    public getArchetype(components: VectorInt): Archetype {
        // New archetype being created
        if (!this.#archetypes.has(components)) {
            const archetype = Archetype.getInstance;
            archetype.components = components;
            this.#archetypes.set(components, archetype);

            if (components.size > 1) {
                for (let i = 0; i < components.size; i++) {
                    const component = components.get(i);
                    if (!this.#archetypeBase[component]) {
                        this.#archetypeBase[component] = new Array();
                    }
                    this.#archetypeBase[component].push(archetype);
                }
            }
        }

        return this.#archetypes.get(components)!;
    }

    public addEntity(archetype: Archetype, entity: number) {
        archetype.set.add(entity);
        this.entities[entity] = archetype.components;
    }

    public removeEntity(archetype: Archetype, entity: number) {
        archetype.set.delete(entity);
        this.entities[entity] = new VectorInt();

        // If there are no entities in this archetype, remove the archetype
        if (archetype.set.size === 0) {
            this.#archetypes.delete(archetype.components);
            for (let i = 0; i < archetype.components.size; i++) {
                const component = archetype.components.get(i);
                this.#archetypeBase[component].splice(this.#archetypeBase[component].indexOf(archetype), 1);
            }
        }
    }

    public switchEntity(fromArchetype: Archetype, toArchetype: Archetype, entity: number) {
        this.removeEntity(fromArchetype, entity);
        this.addEntity(toArchetype, entity);
    }

    public static get getInstance(): ArchetypesManager {
        if (!ArchetypesManager.instance) {
            ArchetypesManager.instance = new ArchetypesManager();
        }

        return ArchetypesManager.instance;
    }
}

export default ArchetypesManager;