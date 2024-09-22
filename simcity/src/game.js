import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
    let activeToolId = "";
    const scene = createScene();
    const city = createCity(16);

    let pause = false;

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        console.log("selectedObject:", selectedObject);

        const {x, y} = selectedObject.userData;
        const tile = city.data[x][y];
        console.log({tile});

        if (activeToolId === "bulldoze") {
            // remove existing building
            tile.buildingId = null;
            scene.update(city);
        } else if (!tile.buildingId) {
            // Place building at that location
            tile.buildingId = activeToolId;
            scene.update(city);
        }
    }
    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolId) {
            console.log("switched toolId from", activeToolId, "to", toolId);
            activeToolId = toolId;
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