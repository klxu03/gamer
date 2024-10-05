import { TickManager } from "./utils/ticker/tickManager";

class Ticker {
    public static instance: Ticker;

    /**
     * Number of miliseconds between each tick
     */
    #tickRate: number;
    
    /**
     * The last tick time
     */
    public lastTick: number;

    /**
     * The interval for starting the tick loop
     */
    #interval: number;

    #tickManager: TickManager;

    constructor() {
        this.#tickRate = Math.ceil(1000 / 128);
        this.lastTick = Date.now();
        this.#interval = 0;

        this.#tickManager = TickManager.getInstance;

        this.#start();
    }

    #start() {
        this.#interval = setInterval(this.tick.bind(this), this.#tickRate);
    }

    /**
     * Stops the tick loop
     */
    public stop() {
        clearInterval(this.#interval);
    }
    
    tick() {
        const delta = Date.now() - this.lastTick;

        if (delta < this.#tickRate) {
            return;
        }
        this.lastTick = Date.now();

        // call tick manager
    }

    public static get getInstance(): Ticker {
        if (!Ticker.instance) {
            Ticker.instance = new Ticker();
        }
        return Ticker.instance;
    }
}

export default Ticker;