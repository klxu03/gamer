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
        console.log("Adding render function to queue", renderFunction);
        this.#renderQueue.push(renderFunction);
    }

    public processRender() {
        if (this.#currentlyRendering) return;

        this.#currentlyRendering = true;
        this.#ticker.tick();

        /* */
        /*
        const startTime = Date.now();
        const entity = 0;
        const componentManager = ComponentManager.getInstance;

        const renderableComponent = componentManager.getEntityComponent(entity, Renderable)! as Renderable;
        renderableComponent.dirty = true;
        const cube = renderableComponent.mesh;

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderableComponent.dirty = false;

        const endTime = Date.now();
        console.log("render time", endTime - startTime);
        */
        /* */

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
