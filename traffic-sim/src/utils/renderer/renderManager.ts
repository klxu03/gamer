import Denque from "denque";
import Renderer from "../../render"
import Queue from "queue";

class RenderManager {
    static #instance: RenderManager;

    /**
     * A queue of lambda render functions to be called every frame
     * TODO: Replace Denque with a queue, this queue supports callback functions and stuff out the gate
     */
    #renderQueue: Queue;

    constructor() {
        this.#renderQueue = new Queue;
    }

    public addRender(renderFunction: () => void) {
        this.#renderQueue.push(renderFunction);
    }

    public processRender(date: number) {
        this.#renderQueue.start(err => {
            if (err) throw err;
            console.log("renderQueue done", this.#renderQueue.results);
        })
    }

    public static get getInstance(): RenderManager {
        if (!RenderManager.#instance) {
            RenderManager.#instance = new RenderManager();
        }
        return RenderManager.#instance;
    }
}

export { RenderManager };
