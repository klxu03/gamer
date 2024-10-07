import Queue from "queue";
import Ticker from "../../tick";

import ComponentManager from "../../components/componentManager";
import Renderable from "../../components/renderable";

class RenderManager {
    static #instance: RenderManager;

    /**
     * A queue of lambda render functions to be called every frame
     */
    #renderQueue: Queue;

    #currentlyRendering: boolean;

    #ticker: Ticker;

    constructor() {
        this.#renderQueue = new Queue;
        this.#currentlyRendering = false;

        this.#ticker = Ticker.getInstance;
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
        this.#ticker.tick();

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

export default RenderManager;
