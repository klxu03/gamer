export default function globalStateManager() {
    let instance = null;

    function createInstance() {
        let activeToolType = "pointer";
        
        /**
         * EntityData is the logic underlying the data in buildings.js
         * MeshData is the direct mesh and asset data
         */
        let selectedEntityData = null;

        /**
         * -1 means nothing is down
         * 0 means left mouse button
         * 1 means middle mouse button
         * 2 means right mouse button
         */
        let mouseDown = -1;

        return {
            setActiveToolType(toolType) {
                console.log("switching activeToolType from", activeToolType, "to", toolType);
                activeToolType = toolType;
            },
            getActiveToolType() {
                return activeToolType;
            },
            setSelectedEntityData(obj) {
                console.log("setting selectedEntityData", obj);
                selectedEntityData = obj;
            },
            getSelectedEntityData() {
                return selectedEntityData;
            },
            setMouseDown(mouseEvent) {
                if (mouseEvent === -1) mouseDown = -1;
                if (mouseDown !== -1) return;
                mouseDown = mouseEvent;
            },
            getMouseDown() {
                return mouseDown;
            },
        }
    }
        
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    };
}