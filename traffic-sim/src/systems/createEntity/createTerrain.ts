import EntityManager from "../../entities/entityManager";
import ComponentManager from "../../components/componentManager";
import Terrain from "../../components/renderable/terrain";
import AssetManager from "../../assets/assetManager";
import Renderable from "../../components/renderable";
import ArchetypesManager from "../../archetypes/archetypesManager";
import VectorInt from "../../dsa/vector_int"
import RenderManager from "../../utils/renderer/renderManager";

class CreateTerrain {
    static #instance: CreateTerrain;

    #entityManager: EntityManager;
    #componentManager: ComponentManager;
    #assetManager: AssetManager;
    #archetypesManager: ArchetypesManager;
    #renderManager: RenderManager;
    constructor() {
        CreateTerrain.#instance = this;
        this.#entityManager = EntityManager.getInstance;
        this.#componentManager = ComponentManager.getInstance;
        this.#assetManager = AssetManager.getInstance;
        this.#archetypesManager = ArchetypesManager.getInstance;
        this.#renderManager = RenderManager.getInstance;
    }

    #createGridTerrain(entityId: number, x: number, y: number, z: number): Renderable {
        const renderGrid = () => {
            const gridMesh = this.#assetManager.getMesh("grid").clone();
            gridMesh.userData = { id: "grid", x, y };
            gridMesh.position.set(x, z, y);

            return gridMesh;
        }

        const renderable = new Renderable(renderGrid);
        renderable.dirty = true;
        this.#componentManager.addEntityToComponent(entityId, renderable);

        return renderable;
    }

    #createGrassTerrain(entityId: number, x: number, y: number, z: number): Renderable {
        const renderGrass = () => {
            const grassMesh = this.#assetManager.getMesh("grass").clone();
            grassMesh.userData = { id: "grass", x, y };
            grassMesh.position.set(x, z, y);

            return grassMesh;
        }

        const renderable = new Renderable(renderGrass);
        renderable.dirty = true;
        this.#componentManager.addEntityToComponent(entityId, renderable);

        return renderable;
    }

    /**
     * Creates a terrain entity
     * @param isDevelopable Whether the terrain is developable
     * @param x The x coordinate of the terrain
     * @param y The y coordinate of the terrain
     * @param z The z coordinate of the terrain
     * @returns The id of the created terrain entity
     */
    createTerrain(isDevelopable: boolean, x: number, y: number, z: number): number {
        const entityId = this.#entityManager.createEntity();
        this.#entityManager.tileManager.set([x, y], entityId);

        const terrain = new Terrain(isDevelopable);
        this.#componentManager.addEntityToComponent(entityId, terrain);

        const renderable = this.#createGridTerrain(entityId, x, y, z);

        const componentArray = [this.#componentManager.getComponentClassId(Terrain), this.#componentManager.getComponentClassId(Renderable)].sort((a, b) => a - b);
        const archetype = this.#archetypesManager.getArchetype(new VectorInt(componentArray));
        this.#archetypesManager.addEntity(archetype, entityId);

        this.#renderManager.addRender(() => {
            renderable.render();

            renderable.dirty = false;

            return new Promise((resolve) => {
                resolve(true);
            });
        });

        return entityId;
    }

    public static get getInstance(): CreateTerrain {
        if (!CreateTerrain.#instance) {
            CreateTerrain.#instance = new CreateTerrain();
        }

        return CreateTerrain.#instance;
    }
}

export default CreateTerrain;