import CreateBuilding from "../createEntity/createBuilding";
import { BuildingType } from "../../components/renderable/building";

export default function buildingGallery(buildingType: string) {
    CreateBuilding.getInstance.createBuilding(3, 3, 0, BuildingType.HOUSE, `${buildingType}-A1`);
    CreateBuilding.getInstance.createBuilding(4, 3, 0, BuildingType.HOUSE, `${buildingType}-A2`);
    CreateBuilding.getInstance.createBuilding(5, 3, 0, BuildingType.HOUSE, `${buildingType}-A3`);

    CreateBuilding.getInstance.createBuilding(3, 5, 0, BuildingType.HOUSE, `${buildingType}-B1`);
    CreateBuilding.getInstance.createBuilding(4, 5, 0, BuildingType.HOUSE, `${buildingType}-B2`);
    CreateBuilding.getInstance.createBuilding(5, 5, 0, BuildingType.HOUSE, `${buildingType}-B3`);

    CreateBuilding.getInstance.createBuilding(3, 7, 0, BuildingType.HOUSE, `${buildingType}-C1`);
    CreateBuilding.getInstance.createBuilding(4, 7, 0, BuildingType.HOUSE, `${buildingType}-C2`);
    CreateBuilding.getInstance.createBuilding(5, 7, 0, BuildingType.HOUSE, `${buildingType}-C3`);
}
