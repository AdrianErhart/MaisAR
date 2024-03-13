// Start Game Button
$('#startButton').click(function () {
    setName($('#nameInput').val());
    // Save the player name to local storage
    clearInterval(checkPlayerReadyInterval);
    showScreen('#scannerScreen');
});

// On Name Input check if player ready
$('#nameInput').on('input', checkIfPlayerReady);

//GPS FUNCTIONS
function checkIfPlayerReady() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const playerPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const distance = calculateDistance(playerPosition, startPoint);
            const nameEntered = $('#nameInput').val().trim() !== '';
            const isWithinStartZone = distance <= zoneRadius;

            $('#startButton').prop('disabled', !(isWithinStartZone && nameEntered));

            if (isWithinStartZone && nameEntered) {
                $('#playerReady').text("Du bist startklar!");
            } else if (!isWithinStartZone) {
                $('#playerReady').text(`Du bist ${Math.round(distance - zoneRadius)} Meter außerhalb der Startzone.`);
            } else {
                $('#playerReady').text("Bitte gib deinen Namen ein.");
            }
        });
    } else {
        $('#playerReady').text("Geolocation wird von deinem Browser nicht unterstützt!");
    }
}

//calculate Distance between two points
function calculateDistance(point1, point2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const R = 6371e3; // Earth radius in meters
    const dLat = toRad(point2.lat - point1.lat);
    const dLon = toRad(point2.lng - point1.lng);
    const lat1 = toRad(point1.lat);
    const lat2 = toRad(point2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distance in meters
}