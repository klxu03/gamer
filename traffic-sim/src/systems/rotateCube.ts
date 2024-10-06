import ComponentManager from "../components/componentManager";
import Renderable from "../components/renderable";
import { TickManager } from "../utils/ticker/tickManager";

export default function rotateCube(entity: number) {
    const componentManager = ComponentManager.getInstance();

    const renderableComponent = componentManager.getEntityComponent(entity, Renderable)! as Renderable;
    renderableComponent.dirty = true;
    const cube = renderableComponent.mesh;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderableComponent.dirty = false;

    TickManager.getInstance().addDirty(() => {
        rotateCube(entity);
        return Date.now();
    });
}
