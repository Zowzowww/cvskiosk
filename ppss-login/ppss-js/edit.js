// Sample data for editing (this can be replaced with actual data from your database)
const sampleBuilding = {
    name: "Main Building",
    description: "This is the main building of the campus, housing administrative offices.",
    rooms: ["Room 101", "Room 102", "Room 103"]
};

// Function to populate form with existing building data
function populateBuildingData() {
    document.getElementById('buildingName').value = sampleBuilding.name;
    document.getElementById('buildingDescription').value = sampleBuilding.description;

    // Populate rooms list
    const roomsList = document.getElementById('roomsList');
    roomsList.innerHTML = ""; // Clear existing rooms
    sampleBuilding.rooms.forEach(room => {
        addRoomInput(room);
    });
}

// Function to add a room input
function addRoomInput(roomName = '') {
    const roomsList = document.getElementById('roomsList');
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room-item');
    roomDiv.innerHTML = `
        <input type="text" class="room-input" value="${roomName}" placeholder="Room name">
        <ion-icon name="close-circle" class="delete-room-icon"></ion-icon>`;
    roomsList.appendChild(roomDiv);
}

// Call the function to populate data on page load
document.addEventListener('DOMContentLoaded', populateBuildingData);

// Add room input dynamically when the "Add Room" button is clicked
document.getElementById('addRoomBtn').addEventListener('click', () => addRoomInput());

// Handle room deletion
document.getElementById('roomsList').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('delete-room-icon')) {
        event.target.closest('.room-item').remove();
    }
});

// Handle form submission
document.getElementById('editBuildingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the updated building name, description, and rooms
    const buildingName = document.getElementById('buildingName').value;
    const buildingDescription = document.getElementById('buildingDescription').value;
    const rooms = Array.from(document.querySelectorAll('.room-input'))
        .map(input => input.value)
        .filter(room => room.trim() !== '');

    // Logic to save the changes (this can be an API call in a real app)
    console.log("Updated Building Name:", buildingName);
    console.log("Updated Building Description:", buildingDescription);
    console.log("Updated Rooms:", rooms);

    // Simulate saving the updated data
    sampleBuilding.name = buildingName;
    sampleBuilding.description = buildingDescription;
    sampleBuilding.rooms = rooms;

    alert("Building information updated successfully!");
});

// Handle building deletion
document.getElementById('deleteBuildingBtn').addEventListener('click', function() {
    const confirmation = confirm("Are you sure you want to delete this building?");
    if (confirmation) {
        // Logic to delete the building (e.g., API call)
        console.log("Building deleted.");
        alert("Building deleted successfully!");
        // Redirect to dashboard or handle accordingly
    }
});

