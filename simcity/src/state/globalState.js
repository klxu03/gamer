export default function globalStateManager() {
    let instance = null;

    function createInstance() {
        let activeToolType = "pointer";

        return {
            setActiveToolType(toolType) {
                console.log("switching activeToolType from", activeToolType, "to", toolType);
                activeToolType = toolType;
            },
            getActiveToolType() {
                console.log("return activeTool type", activeToolType)
                return activeToolType;
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