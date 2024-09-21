import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);

    const game = {
        update() {
            city.update();
            scene.update(city);
        }
    }

    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();

    return game;
}