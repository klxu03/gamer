import Component from "./component";

class ComponentManager {
    public static instance: ComponentManager;

    /**
     * Reverse map, index to component
     */
    public components: Array<typeof Component>;

    /**
     * Map, component to index
     */
    public componentMap: Map<typeof Component, number>;

    /**
     * For each component, an array of all entities
     * componentList[i][j] is the component of the jth entity of the ith component
     * If it is null, then entity does not have the component, otherwise it is the state of that component
     */
    public componentList: Array<Array<Component | null>>;

    constructor() {
        this.components = new Array();

        this.components.push(Component);
        this.componentMap = new Map();
        this.componentMap.set(this.components[0], 0);

        this.componentList = new Array();
    }

    public getComponentId(component: typeof Component): number {
        return this.componentMap.get(component)!;
    }

    public static get getInstance(): ComponentManager {
        if (!ComponentManager.instance) {
            ComponentManager.instance = new ComponentManager();
        }

        return ComponentManager.instance;
    }
}

export default ComponentManager;