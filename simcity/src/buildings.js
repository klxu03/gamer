import { createCitizen } from './citizens.js';
import { notifyCallbacks } from './callback.js';

export default function createBuildingFactory(buildingType, x, y) {
    switch (buildingType) {
        case "residential":
            return createResidentialBuilding(x, y);
        case "commercial":
            return createCommercialBuilding(x, y);
        case "industrial":
            return createIndustrialBuilding(x, y);
        case "road":
            return createRoad(x, y);
        default:
            console.error(`${buildingType} is not a recognized building type`);
    }

    function createResidentialBuilding(x, y) {
        return {
            id: crypto.randomUUID(),
            type: "residential",
            height: 1,
            dirty: true,
            residents: [],
            maxResidents: 4,
            location: {
                x, 
                y
            },
            update: function(city) {
                if (this.residents.length < this.maxResidents) {
                    const resident = createCitizen(this);
                    this.residents.push(resident);
                    city.citizens.push(resident);
                    console.log(resident, `moved into the ${this.type}`);
                    notifyCallbacks(this);
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

    function createCommercialBuilding(x, y) {
        return {
            id: crypto.randomUUID(),
            type: "commercial",
            height: 1,
            dirty: true,
            location: {
                x, 
                y
            },
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

    function createIndustrialBuilding(x, y) {
        return {
            id: crypto.randomUUID(),
            type: "industrial",
            height: 1,
            dirty: true,
            location: {
                x, 
                y
            },
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

    function createRoad(x, y) {
        return {
            type: "road",
            dirty: true,
            location: {
                x, 
                y
            },
            update: function() {
                this.dirty = false;
            }
        }
    }
}