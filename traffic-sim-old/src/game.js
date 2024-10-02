import { createScene } from "./scene.js";
import City from "./city.js";
import { globalState } from "./state/stateManager.js";

export function createGame() {
    const scene = createScene();
    const city = new City(16);

    let pause = false;

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        const {x, y} = selectedObject.userData;
        const tile = city.tiles[x][y];

        if (globalState.getActiveToolType() === "bulldoze") {
            // remove existing building
            tile.removeBuilding();
            scene.update(city);
        } else if (globalState.getActiveToolType() !== "pointer" && !tile.building) {
            // Place building at that location
            tile.placeBuilding(globalState.getActiveToolType());
            scene.update(city);
        }
    }
    // maybe instead of this, just change createScene to getScene and use this state
    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
    document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolType(toolType) {
            globalState.setActiveToolType(toolType);
            scene.unselectObject();
        },
        pause() {
            pause = !pause;
            return "success";
        }
    }

    setInterval(() => {
        if (!pause) {
            game.update();
        }
    }, 1000);

    scene.start();

    return game;
}