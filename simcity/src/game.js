import { createScene } from "./scene.js";
import { createCity } from "./city.js";

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
    }
    document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
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