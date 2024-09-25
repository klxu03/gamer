import { createScene } from "./scene.js";
import { createCity } from "./city.js";
import createBuildingFactory from "./buildings.js";

export function createGame() {
    let activeToolType = "";
    const scene = createScene();
    const city = createCity(16);

    let pause = false;

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        console.log("selectedObject:", selectedObject);

        const {x, y} = selectedObject.userData;
        const tile = city.data[x][y];
        console.log({tile});

        if (activeToolType === "bulldoze") {
            // remove existing building
            tile.building = null;
            scene.update(city);
        } else if (!tile.building) {
            // Place building at that location
            console.log("placing building");
            tile.building = createBuildingFactory(activeToolType);
            scene.update(city);
        }
    }
    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolType) {
            console.log("switched toolId from", activeToolType, "to", toolType);
            activeToolType = toolType;
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