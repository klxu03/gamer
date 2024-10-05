import System from "./system";

class SystemManager {
    public static instance: SystemManager;

    public systemsMap: Map<System, number>;
    
    /**
     * Adjacency matrix, where the value at systems[i][j] is the index of the system that j that depends on i
     * The boolean value is true if dependency should be called immediately, false it should be added to the dirty queue
     */
    #adj: Array<Array<[number, boolean]>>;

    constructor() {
        this.systemsMap = new Map();
        this.#adj = [];
    }

    public addSystem(system: System, dependencies: Array<[number, boolean]>) {
        this.#adj.push(dependencies);
        this.systemsMap.set(system, this.#adj.length - 1);
    }

    public static getInstance(): SystemManager {
        if (!SystemManager.instance) {
            SystemManager.instance = new SystemManager();
        }
        return SystemManager.instance;
    }
}

export default SystemManager;