import EntityManager from "../../entities/entityManager";
import ComponentManager from "../../components/componentManager";
import Tile from "../../components/core/tile";
import Terrain from "../../components/renderable/terrain";
import AssetManager from "../../assets/assetManager";
import Renderable from "../../components/renderable";
import ArchetypesManager from "../../archetypes/archetypesManager";
import VectorInt from "../../dsa/vector_int"
import RenderManager from "../../utils/renderer/renderManager";

class CreateTerrain {
    public static instance: CreateTerrain;

    #entityManager: EntityManager;
    #componentManager: ComponentManager;
    #assetManager: AssetManager;
    #archetypesManager: ArchetypesManager;
    #renderManager: RenderManager;
    constructor() {
        this.#entityManager = EntityManager.getInstance;
        this.#componentManager = ComponentManager.getInstance;
        this.#assetManager = AssetManager.getInstance;
        this.#archetypesManager = ArchetypesManager.getInstance;
        this.#renderManager = RenderManager.getInstance;
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

        const tile = new Tile(x, y, 0);
        this.#componentManager.addEntityToComponent(entityId, tile);

        const terrain = new Terrain(isDevelopable);
        this.#componentManager.addEntityToComponent(entityId, terrain);

        const renderGrass = () => {
            const mesh = this.#assetManager.getMesh("grass").clone();
            mesh.userData = { id: "grass", x, y };
            mesh.position.set(x, -0.5, y);

            return mesh;
        }

        const renderable = new Renderable(renderGrass);
        renderable.dirty = true;
        this.#componentManager.addEntityToComponent(entityId, renderable);

        const componentArray = [this.#componentManager.getComponentClassId(Tile), this.#componentManager.getComponentClassId(Terrain), this.#componentManager.getComponentClassId(Renderable)].sort((a, b) => a - b);
        const archetype = this.#archetypesManager.getArchetype(new VectorInt(componentArray));
        this.#archetypesManager.addEntity(archetype, entityId);

        this.#renderManager.addRender(() => {
            renderable.render();

            return new Promise((resolve) => {
                resolve(true);
            });
        });

        return entityId;
    }

    public static get getInstance(): CreateTerrain {
        if (!CreateTerrain.instance) {
            CreateTerrain.instance = new CreateTerrain();
        }

        return CreateTerrain.instance;
    }
}

export default CreateTerrain;