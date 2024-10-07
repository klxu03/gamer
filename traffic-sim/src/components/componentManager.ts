import Component from "./component";
import Renderable from "./renderable";
import Tile from "./core/tile";
import Terrain from "./renderable/terrain";
import { Building } from "./renderable/building";

type ComponentClass = typeof Component | (new (...args: any[]) => Component);

class ComponentManager {
    static #instance: ComponentManager;

    /**
     * Array of component classes
     */
    public components: Array<ComponentClass>;

    /**
     * Map, component class to index
     */
    public componentMap: Map<ComponentClass, number>;

    /**
     * For each component, an array of all entities
     * componentList[i][j] is the ith component and the jth entity
     * If it is null, then entity does not have the component, otherwise it is the state of that component
     */
    public componentList: Array<Array<Component | null>>;

    constructor() {
        ComponentManager.#instance = this;
        this.components = new Array();
        this.componentMap = new Map();
        this.componentList = new Array();

        this.#initComponentsAndComponentsMap();
        this.#initComponentList();
    }

    #initComponentsAndComponentsMap() {
        this.components.push(Component);
        this.componentMap.set(Component, 0);

        this.components.push(Renderable);
        this.componentMap.set(Renderable, 1);

        this.components.push(Tile);
        this.componentMap.set(Tile, 2);

        this.components.push(Terrain);
        this.componentMap.set(Terrain, 3);

        this.components.push(Building);
        this.componentMap.set(Building, 4);
    }

    #initComponentList() {
        for (let i = 0; i < this.components.length; i++) {
            this.componentList.push(new Array());
        }
    }

    public getComponentClassId(componentClass: ComponentClass): number {
        return this.componentMap.get(componentClass) ?? -1;
    }

    public addEntityToComponent(entityId: number, component: Component) {
        const componentId = this.getComponentClassId(component.constructor as ComponentClass);
        this.componentList[componentId][entityId] = component;
    }

    public getEntityComponent(entityId: number, componentClass: ComponentClass): Component | null {
        const componentId = this.getComponentClassId(componentClass);
        return this.componentList[componentId][entityId];
    }

    public static get getInstance(): ComponentManager {
        if (!ComponentManager.#instance) {
            ComponentManager.#instance = new ComponentManager();
        }

        return ComponentManager.#instance;
    }
}

export default ComponentManager;