const buildings = [
    {
        name: "Main Building",
        rooms: ["Room 101", "Room 102", "Room 103", "Room 104"]
    },
    {
        name: "Science Building",
        rooms: ["Lab 201", "Lab 202", "Lecture Hall 203"]
    },
    {
        name: "Library",
        rooms: ["Reading Area", "Computer Lab", "Archives"]
    }
];

const buildingsContainer = document.getElementById('buildingsContainer');

// Object to track visibility of rooms for each building
const buildingVisibility = {};

function createBuildingElement(building, index) {
    const buildingDiv = document.createElement('div');
    buildingDiv.className = 'building';

    const buildingHeader = document.createElement('div');
    buildingHeader.className = 'building-header';

    const buildingTitle = document.createElement('h2');
    buildingTitle.textContent = building.name;

    const deleteIcon = document.createElement('ion-icon');
    deleteIcon.name = 'trash-outline';
    deleteIcon.className = 'delete-icon';
    deleteIcon.addEventListener('click', () => deleteBuilding(index));

    buildingHeader.appendChild(buildingTitle);
    buildingHeader.appendChild(deleteIcon);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Show Rooms';

    const roomsDiv = document.createElement('div');
    roomsDiv.className = 'rooms';

    building.rooms.forEach((room, roomIndex) => {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room';
        
        const roomText = document.createElement('span');
        roomText.textContent = room;
        
        const roomDeleteIcon = document.createElement('ion-icon');
        roomDeleteIcon.name = 'close-circle-outline';
        roomDeleteIcon.className = 'delete-icon';
        roomDeleteIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteRoom(index, roomIndex);
        });

        roomDiv.appendChild(roomText);
        roomDiv.appendChild(roomDeleteIcon);
        roomsDiv.appendChild(roomDiv);
    });

    // Set initial visibility to false (closed) for new buildings
    if (buildingVisibility[index] === undefined) {
        buildingVisibility[index] = false;  // default is closed
    }

    // Set room visibility based on previous state
    if (buildingVisibility[index]) {
        roomsDiv.style.display = 'block';
        toggleButton.textContent = 'Hide Rooms';
    } else {
        roomsDiv.style.display = 'none';
        toggleButton.textContent = 'Show Rooms';
    }

    toggleButton.addEventListener('click', () => {
        // Toggle visibility and update the state
        buildingVisibility[index] = !buildingVisibility[index];
        renderBuildings(); // Re-render the buildings to preserve state
    });

    buildingDiv.appendChild(buildingHeader);
    buildingDiv.appendChild(toggleButton);
    buildingDiv.appendChild(roomsDiv);

    return buildingDiv;
}

function deleteBuilding(index) {
    buildings.splice(index, 1);
    renderBuildings();
}

function deleteRoom(buildingIndex, roomIndex) {
    buildings[buildingIndex].rooms.splice(roomIndex, 1);
    renderBuildings();
}

function renderBuildings() {
    buildingsContainer.innerHTML = '';
    buildings.forEach((building, index) => {
        const buildingElement = createBuildingElement(building, index);
        buildingsContainer.appendChild(buildingElement);
    });
}

renderBuildings();
