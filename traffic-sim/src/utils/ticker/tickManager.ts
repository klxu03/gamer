import { Deque } from "collections/deque";


// set up the tick, store all the systems and do the logic to figure out which ones to call
class TickManager {
    #dirty: Deque<number>;

    constructor() {
        this.#dirty = new Deque<number>();
    }
}

export default TickManager;