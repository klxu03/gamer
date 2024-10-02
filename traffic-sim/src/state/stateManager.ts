import { GameState } from "./gameState";

class StateManager {
    static #instance: StateManager;
    public gameState: GameState;

    private constructor() {
        this.gameState = new GameState();
    }

    public static getInstance(): StateManager {
        if (!StateManager.#instance) {
            StateManager.#instance = new StateManager();
        }
        return StateManager.#instance;
    }
}

export default StateManager;