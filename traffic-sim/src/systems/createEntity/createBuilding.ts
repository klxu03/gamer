import EntityManager from "../../entities/entityManager";
import ComponentManager from "../../components/componentManager";
import AssetManager from "../../assets/assetManager";
import ArchetypesManager from "../../archetypes/archetypesManager";
import Renderable from "../../components/renderable";
import RenderManager from "../../utils/renderer/renderManager";
import { Building, BuildingType } from "../../components/renderable/building";
import VectorInt from "../../dsa/vector_int"

class CreateBuilding {
    static #instance: CreateBuilding;

    #entityManager: EntityManager;
    #componentManager: ComponentManager;
    #assetManager: AssetManager;
    #archetypesManager: ArchetypesManager;
    #renderManager: RenderManager;

    #buildingTypeToId = {
        [BuildingType.HOUSE]: "residential",
        [BuildingType.COMMERCIAL]: "commercial",
        [BuildingType.INDUSTRIAL]: "industrial",
    }

    constructor() {
        CreateBuilding.#instance = this;
        this.#entityManager = EntityManager.getInstance;
        this.#componentManager = ComponentManager.getInstance;
        this.#assetManager = AssetManager.getInstance;
        this.#archetypesManager = ArchetypesManager.getInstance;
        this.#renderManager = RenderManager.getInstance;
    }

    public createBuilding(x: number, y: number, z: number, buildingType: BuildingType, model: string): number {
        const entityId = this.#entityManager.createEntity();

        const building = new Building(1, 3, 4, buildingType, [], x, y, z);
        this.#componentManager.addEntityToComponent(entityId, building);

        const renderBuilding = () => {
            const mesh = this.#assetManager.getMesh(model).clone();
            mesh.userData = { id: this.#buildingTypeToId[buildingType] };
            mesh.position.set(x, z, y);

            return mesh;
        }

        const renderable = new Renderable(renderBuilding);
        renderable.dirty = true;
        this.#componentManager.addEntityToComponent(entityId, renderable);

        const componentArray = [this.#componentManager.getComponentClassId(Building), this.#componentManager.getComponentClassId(Renderable)].sort((a, b) => a - b);
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

    public static get getInstance(): CreateBuilding {
        if (!CreateBuilding.#instance) {
            CreateBuilding.#instance = new CreateBuilding();
        }
        return CreateBuilding.#instance;
    }
}

export default CreateBuilding;