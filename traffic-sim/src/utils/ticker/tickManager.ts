import Denque from "denque";

type Triplet<T, U, V> = [T, U, V];

/**
 * A pair of numbers representing the entity ID, component ID, and the last tick that the component was updated
 */
type DirtyTriplet = Triplet<number, number, number>;

// set up the tick, store all the systems and do the logic to figure out which ones to call
class TickManager {
    static #instance: TickManager;
    #dirty: Denque<DirtyTriplet>;

    constructor() {
        this.#dirty = new Denque<DirtyTriplet>();
    }

    public static get getInstance(): TickManager {
        if (!TickManager.#instance) {
            TickManager.#instance = new TickManager();
        }
        return TickManager.#instance;
    }
}

export { TickManager, DirtyTriplet };
