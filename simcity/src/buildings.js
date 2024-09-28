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
            level: 1,
            maxLevel: 5,
            dirty: true,
            maxOccupancy: 4,
            location: {
                x, 
                y
            },
            residents: [],
            update: function(city) {
                if (this.residents.length < this.maxOccupancy) {
                    const resident = createCitizen(this);
                    this.residents.push(resident);
                    city.citizens.push(resident);
                    notifyCallbacks(this);
                }

                this.dirty = false;
                if (Math.random() < 0.5) {
                    if (this.level < this.maxLevel) {
                        this.level++;
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
            level: 1,
            maxLevel: 5,
            dirty: true,
            location: {
                x, 
                y
            },
            update: function(city) {
                this.dirty = false;
                if (Math.random() < 0.5) {
                    if (this.level < this.maxLevel) {
                        this.level++;
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
            level: 1,
            maxLevel: 5,
            dirty: true,
            location: {
                x, 
                y
            },
            update: function(city) {
                this.dirty = false;
                if (Math.random() < 0.5) {
                    if (this.level < this.maxLevel) {
                        this.level++;
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