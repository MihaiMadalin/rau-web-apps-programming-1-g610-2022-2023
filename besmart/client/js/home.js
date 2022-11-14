class Equipment {
    id;
    name;
    numberOfInputs;
    numberOfOutputs;
    requiredCurrent;
    requiredVoltage;
    description;
    connections;

    constructor(name, numberOfInputs, numberOfOutputs, requiredCurrent = 0, requiredVoltage = 0, description = '') {
        this.name = name;
        this.description = description;
        this.numberOfInputs = numberOfInputs;
        this.numberOfOutputs = numberOfOutputs;
        this.requiredCurrent = requiredCurrent;
        this.requiredVoltage = requiredVoltage;
        this.connections = [];
    }

    connectWith(equipment) {
        this.connections.push(equipment);
    }
}

class Simulation {
    constructor() {
        this.equipments = [];
    }

    addEquipment(equipment) {
        this.equipments.push(equipment);
    }

    removeEquipment(equipment) {
        const equipmentIndex = this.equipments.indexOf(equipment);
        this.equipments.splice(equipmentIndex, 1);    
    }

    test() {
        // TODO: implement test later
    }

    connect(equipment1, equipment2) {
        if (this.checkIfConnectionPossible(equipment1, equipment2)) {
            const indexOfEquipment1 = this.equipments.indexOf(equipment1);
            this.equipments[indexOfEquipment1].connectWith(equipment2);

            const indexOfEquipment2 = this.equipments.indexOf(equipment2);
            this.equipments[indexOfEquipment2].connectWith(equipment1);
        } else {
            throw "Unable to connect equipments";
        }
    }

    checkIfConnectionPossible(equipment1, equipment2) {
        if (equipment1.numberOfOutputs > equipment2.numberOfInputs) {
            return false;
        }
        return true;
    }
}


const EQUIPMENTS = [
    new Equipment("LED", 2, 1),
    new Equipment("Battery", 0, 2),
    new Equipment("Resistor", 1, 1),
    new Equipment("Capacitor", 1, 1)
]

const simulation = new Simulation();
// simulation.addEquipment(EQUIPMENTS[0]);
// simulation.addEquipment(EQUIPMENTS[1]);
// simulation.connect(simulation.equipments[1], simulation.equipments[0]);
// console.log(simulation);


function addEquipmentsToDropdown(equipments) {
    const equipmentsDropdown = document.getElementById("equipment-select");
    if (equipmentsDropdown) {
        const option = document.createElement("option");
        option.value = "Select equipment...";
        option.innerText ="Select equipment...";
        equipmentsDropdown.appendChild(option);
        for (const equipment of equipments) {
            const option = document.createElement("option");
            option.value = ""
            option.innerText = equipment.name;
            equipmentsDropdown.appendChild(option);
        }
    }
}


function getSelectedEquipment() {
    const select = document.getElementById("equipment-select");
    const equipmentName = select.options[select.selectedIndex].text;
    for (const equipment of EQUIPMENTS) {
        if (equipment.name === equipmentName) {
            simulation.addEquipment(equipment);
            break;
        }
    }
    select.selectedIndex = 0;
    console.log(simulation);
}

function createEquipmentsDropdown(equipments) {
    const select = document.createElement("select");
    select.name = "equipment";
    select.id = "equipment-select";
    select.onchange = getSelectedEquipment;
    const addEquipmentButton = document.getElementById("add-equipment-button");
    addEquipmentButton.appendChild(select);

    addEquipmentsToDropdown(equipments);
}

createEquipmentsDropdown(EQUIPMENTS);
