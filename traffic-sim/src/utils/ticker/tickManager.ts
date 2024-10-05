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
    #currentlyTicking: boolean;

    constructor() {
        this.#dirty = new Denque<DirtyTriplet>();
        this.#currentlyTicking = false;
    }

    /**
     * Ticks the systems that are dirty and have have been added before the tick loop started
     * @param tickStart The tick that the tick loop started on
     * @returns Whether the tick loop finished
     */
    public tick(tickStart: number): boolean {
        if (this.#currentlyTicking) return false;
        this.#currentlyTicking = true;

        while (this.#dirty.length > 0) {
            const [entity, component, tick] = this.#dirty.shift()!;

            if (tick <= tickStart) {
                this.#tick(entity, component, tick);
            }
        }
        this.#currentlyTicking = false;

        return true;
    }

    /**
     * Ticks a single system
     * @param entity The entity to tick
     * @param component The component to tick
     * @param tick The tick that the system was updated last
     */
    #tick(entity: number, component: number, tick: number) {
        // TODO: Implement
    }

    public static get getInstance(): TickManager {
        if (!TickManager.#instance) {
            TickManager.#instance = new TickManager();
        }
        return TickManager.#instance;
    }
}

export { TickManager, DirtyTriplet };
