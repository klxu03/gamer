import Component from "./component";

class ComponentManager {
    public static instance: ComponentManager;

    public components: Array<Component>;
    public componentMap: Map<Component, number>;

    constructor() {
        this.components = new Array();

        this.components.push(new Component());
        this.componentMap = new Map();
        this.componentMap.set(this.components[0], 0);
    }

    public getComponentId(component: Component): number {
        if (!this.componentMap.has(component)) {
            this.components.push(component);
            this.componentMap.set(component, this.components.length - 1);
        }

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