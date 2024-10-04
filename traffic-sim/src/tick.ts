class Ticker {
    /**
     * Number of miliseconds between each tick
     */
    #tickRate: number;
    
    /**
     * The last tick time
     */
    #lastTick: number;

    constructor() {
        this.#tickRate = Math.ceil(1000 / 128);
        this.#lastTick = Date.now();
    }
    
    tick() {
        const delta = Date.now() - this.#lastTick;

        if (delta < this.#tickRate) {
            return;
        }
        this.#lastTick = Date.now();

        // call tick manager
    }
}