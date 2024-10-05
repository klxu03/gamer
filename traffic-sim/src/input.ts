enum MouseButton {
    NONE = -1,
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
}

class InputManager {
    static #instance: InputManager;
    public mouseDown: MouseButton;

    private constructor() {
        this.mouseDown = MouseButton.NONE;

        window.addEventListener("mousedown", this.#onMouseDown.bind(this));
        window.addEventListener("mouseup", this.#onMouseUp.bind(this));
    }

    #setMouseDown(button: MouseButton) {
        console.log("Mouse down: ", button);
        this.mouseDown = button;
    }

    #onMouseDown(event: MouseEvent) {
        this.#setMouseDown(event.button as MouseButton);
    }

    #onMouseUp(event: MouseEvent) {
        this.mouseDown = MouseButton.NONE;
    }

    public static get getInstance(): InputManager {
        if (!InputManager.#instance) {
            InputManager.#instance = new InputManager();
        }
        return InputManager.#instance;
    }
}

export { MouseButton, InputManager };