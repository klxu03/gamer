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

    #tickManager: TickManager;

    constructor() {
        this.#tickRate = Math.ceil(1000 / 64);
        this.lastTick = Date.now();

        this.#tickManager = TickManager.getInstance();
    }

    /**
     * Tick the game
     */
    public tick() {
        const delta = Date.now() - this.lastTick;

        if (delta < this.#tickRate || this.#tickManager.currentlyTicking) {
            return;
        }

        this.lastTick = Date.now();

        this.#tickManager.tick(this.lastTick);
    }

    public static getInstance(): Ticker {
        if (!Ticker.instance) {
            Ticker.instance = new Ticker();
        }
        return Ticker.instance;
    }
}

export default Ticker;