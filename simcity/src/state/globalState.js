export default function globalStateManager() {
    let instance = null;

    function createInstance() {
        let activeToolType = "pointer";
        
        /**
         * EntityData is the logic underlying the data in buildings.js
         * MeshData is the direct mesh and asset data
         */
        let selectedEntityData = null;

        return {
            setActiveToolType(toolType) {
                console.log("switching activeToolType from", activeToolType, "to", toolType);
                activeToolType = toolType;
            },
            getActiveToolType() {
                return activeToolType;
            },
            setSelectedEntityData(obj) {
                selectedEntityData = obj;
            },
            getSelectedEntityData() {
                return selectedEntityData;
            }
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