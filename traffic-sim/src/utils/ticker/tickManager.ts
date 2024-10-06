import Denque from "denque";

type Triplet<T, U, V> = [T, U, V];

/**
 * A pair of numbers representing the entity ID, component ID, and the last tick that the component was updated
 * Or a function that should be called that returns the tick it was called at
 */
type DirtyTriplet = Triplet<number, number, number> | (() => number);

// set up the tick, store all the systems and do the logic to figure out which ones to call
class TickManager {
    static #instance: TickManager;
    #dirtyDeque: Denque<DirtyTriplet>;
    public currentlyTicking: boolean;

    constructor() {
        this.#dirtyDeque = new Denque<DirtyTriplet>();
        this.currentlyTicking = false;
    }

    /**
     * Ticks the systems that are dirty and have have been added before the tick loop started
     * @param tickStart The tick that the tick loop started on
     * @returns Whether the tick loop finished
     */
    public tick(tickStart: number): boolean {
        this.currentlyTicking = true;

        while (this.#dirtyDeque.length > 0) {
            const dirty = this.#dirtyDeque.shift()!;

            if (typeof dirty === "function") {
                // DirtyTriplet was a function, so we just call it
                const tick = dirty();

                if (tick > tickStart) {
                    break;
                }
            } else {
                // DirtyTriplet was a triplet, so we need to search for which system handles this change
                const [entity, component, tick] = dirty;

                if (tick! <= tickStart) {
                    this.#tick(entity, component, tick!);
                } else {
                    break;
                }
            }
        }
        this.currentlyTicking = false;

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

    public addDirty(dirty: DirtyTriplet) {
        this.#dirtyDeque.push(dirty);
    }

    public static getInstance(): TickManager {
        if (!TickManager.#instance) {
            TickManager.#instance = new TickManager();
        }
        return TickManager.#instance;
    }
}

export { TickManager, DirtyTriplet };
