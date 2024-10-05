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

    #currentlyRendering: boolean;

    constructor() {
        this.#renderQueue = new Queue;
        this.#currentlyRendering = false;
    }

    /**
     * Adds a render function to the queue, it should end with the following promise:
     * 
            return new Promise((resolve) => {
                resolve(true);
            });
     * @param renderFunction The function to be rendered to the scene
     */
    public addRender(renderFunction: () => void) {
        this.#renderQueue.push(renderFunction);
    }

    public processRender() {
        if (this.#currentlyRendering) return;

        this.#currentlyRendering = true;

        this.#renderQueue.start(err => {
            this.#currentlyRendering = false;
            if (err) throw err;
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
