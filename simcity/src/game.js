import { createScene } from "./scene.js";
import { createCity } from "./city.js";
import { globalState } from "./state/stateManager.js";

export function createGame() {
    const scene = createScene();
    const city = createCity(16);

    let pause = false;

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        console.log("selectedObject:", selectedObject);

        const {x, y} = selectedObject.userData;
        const tile = city.data[x][y];
        console.log({tile});

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
    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolType(toolType) {
            globalState.setActiveToolType(toolType);
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