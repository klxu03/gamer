class Component {
    /**
     * Whether the component has been updated since the last tick
     */
    public dirty: boolean;

    public static instance: Component;

    constructor() {
        this.dirty = false;
    }

    public static get getInstance(): Component {
        if (!Component.instance) {
            Component.instance = new Component();
        }
        return Component.instance;
    }
}

export default Component;