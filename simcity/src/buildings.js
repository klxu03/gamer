import { createCitizen } from './citizens.js';

export default function createBuildingFactory(buildingType) {
    switch (buildingType) {
        case "residential":
            return createResidentialBuilding();
        case "commercial":
            return createCommercialBuilding();
        case "industrial":
            return createIndustrialBuilding();
        case "road":
            return createRoad();
        default:
            console.error(`${buildingType} is not a recognized building type`);
    }

    function createResidentialBuilding() {
        return {
            id: crypto.randomUUID(),
            type: "residential",
            height: 1,
            dirty: true,
            residents: [],
            maxResidents: 4,
            update: function(city) {
                if (this.residents.length < this.maxResidents) {
                    const resident = createCitizen(this);
                    this.residents.push(resident);
                    city.citizens.push(resident);
                    console.log(resident, `moved into the ${this.type}`);
                }

                this.dirty = false;
                if (Math.random() < 0.5) {
                    if (this.height < 5) {
                        this.height++;
                        this.dirty = true;
                    }
                }
            }
        };
    }

    function createCommercialBuilding() {
        return {
            id: crypto.randomUUID(),
            type: "commercial",
            height: 1,
            dirty: true,
            update: function(city) {
                this.dirty = false;
                if (Math.random() < 0.5) {
                    if (this.height < 5) {
                        this.height++;
                        this.dirty = true;
                    }
                }
            }
        }
    }

    function createIndustrialBuilding() {
        return {
            id: crypto.randomUUID(),
            type: "industrial",
            height: 1,
            dirty: true,
            update: function(city) {
                this.dirty = false;
                if (Math.random() < 0.5) {
                    if (this.height < 5) {
                        this.height++;
                        this.dirty = true;
                    }
                }
            } 
        }
    }

    function createRoad() {
        return {
            type: "road",
            dirty: true,
            update: function() {
                this.dirty = false;
            }
        }
    }
}