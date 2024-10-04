import Denque from "denque";
import Renderer from "../../render"

/**
 * A pair of render function and the time it was added to the queue
 */
type RenderPair = [() => void, number];

class RenderManager {
    static #instance: RenderManager;
    /**
     * A queue of lambda render functions to be called every frame
     */
    #renderQueue: Denque<RenderPair>;

    constructor() {
        this.#renderQueue = new Denque<RenderPair>();
    }

    public addRender(renderFunction: () => void) {
        this.#renderQueue.push([renderFunction, Date.now()]);
    }

    public processRender(date: number) {
        while (this.#renderQueue.length > 0) {
            const [renderFunction, time] = this.#renderQueue.peekFront()!;
            if (date > time) {
                renderFunction();
                this.#renderQueue.shift();
            } else {
                break;
            }
        }
    }

    public static getInstance(): RenderManager {
        if (!RenderManager.#instance) {
            RenderManager.#instance = new RenderManager();
        }
        return RenderManager.#instance;
    }
}

export { RenderManager, RenderPair };