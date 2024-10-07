import { GameState } from "./gameState";

class StateManager {
    static #instance: StateManager;
    public gameState: GameState;

    private constructor() {
        StateManager.#instance = this;
        this.gameState = new GameState();
    }

    public static get getInstance(): StateManager {
        if (!StateManager.#instance) {
            StateManager.#instance = new StateManager();
        }
        return StateManager.#instance;
    }
}

export default StateManager;