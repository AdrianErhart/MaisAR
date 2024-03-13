// GLOBAL VARIABLES
let checkPlayerReadyInterval;
let playerName = '';

let currentScene = '';
let currentScreen = '';
let dialogueIndex = 0;

let currentHatIndex = 0;
let currentGlassesIndex = 0;
let currentBeardIndex = 0;
let currentClothesIndex = 0;

let collectedParts = new Set();
let solvedMarkers = new Set();
let isUfoRepaired = false;
let victoryPhoto = '';

//DOM READY
$(document).ready(function () {
    //register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function () {
            console.log('ServiceWorker registration successful');
        }).catch(function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    //add iframe to the dom
    addArFrame().then(() => {
        // Load from Local Storage after ARFrame is added
        loadUfoStatus();
        loadCollectedParts();
        loadSolvedMarkers();
        loadName();
        loadClothing();
        loadVictoryPhoto();
        //SHOW SCREEN 
        if (playerName && victoryPhoto) { //if playerName and victoryPhoto are saved
            showScreen('#victoryScreen');
        } else if (playerName) { //if playerName is saved
            showScreen('#scannerScreen');
        } else {
            showScreen('#startScreen');
        }
    });
});

//ADD AR FRAME
function addArFrame() {
    return new Promise((resolve) => {
        var scene = $('<iframe>') // Create an <iframe> element
            .attr('src', '../arframe.html') // Set the 'src' attribute
            .attr('height', '100%')
            .attr('width', '100%') // Set the 'width' attribute
            .attr('id', 'iFrame')
            .on('load', resolve);

        $('#arFrame').append(scene); // Append the <iframe> to the container
    });

}

//SHOW SCREEN
function showScreen(newScreen) {
    //hide old screen
    if (currentScreen) {
        $(currentScreen).removeClass('d-flex');
        $(currentScreen).addClass('d-none');
    }

    //show new screen
    $(newScreen).removeClass('d-none');
    $(newScreen).addClass('d-flex');

    currentScreen = newScreen;
}

//DIALOGUE HANDLING

function showScene(sceneName) { //show current scene
    dialogueIndex = 0;
    currentScene = sceneName;
    showDialogue(dialogueIndex);
}

function showDialogue(index) { //show current dialogue
    const dialogue = dialogues[currentScene][index];
    $("#dialogueTextboxTitle").text(dialogue.speaker);
    $("#dialogueTextboxContent").text(dialogue.text);
    //if speaker is alien, load directly from entities because here the custom-image is updated, the const dialogues was initialised at the beginning
    if (dialogue.image == 'images/alien.png') {
        $("#speakerImg").attr("src", entities.alien.img).show;
    } else {
        $("#speakerImg").attr("src", dialogue.image).show;
    }
}

$("#nextDialogue").click(function () {
    dialogueIndex += 1;
    if (dialogueIndex < dialogues[currentScene].length) {
        showDialogue(dialogueIndex);
    } else {
        showScreen(dialogues[currentScene][dialogueIndex - 1].nextScreen);
    }
});

//COLLECTING PARTS

function collectPart(part) {
    collectedParts.add(part);
    localStorage.setItem('collectedParts', JSON.stringify([...collectedParts]));
    updateBag();
}

function loadCollectedParts() {
    const loadedParts = JSON.parse(localStorage.getItem('collectedParts'));
    if (loadedParts) {
        collectedParts = new Set(loadedParts);
    }
    updateBag();
}

function updateBag() {
    //Update Bag Button on Scanner Screen
    $('#bagButton').html(`<i class="bi bi-backpack"></i>`).text(' Beutel (' + collectedParts.size + "/6)");

    //Update Bag Screen
    Object.keys(parts).forEach(part => {
        const partDiv = $(`#${part}`);
        if (collectedParts.has(part)) {
            partDiv.html(`<img src="${parts[part].img}" alt="${parts[part].name}">`);
        } else {
            partDiv.html('<img src="images/unknown.png" alt="Unbekannt">');
        }
    });
}

//BUTTON CLICK HANDLING

$("#bagButton").click(function () { // bag button on scanner screen
    showScreen('#bagScreen');
});

$("#settingButton").click(function () { // setting button on scanner screen
    showScreen('#settingScreen');
});

$("#bagScannerButton").click(function () { // scanner button on bag screen
    showScreen('#scannerScreen');
});

$("#settingScannerButton").click(function () { // scanner button on setting screen
    showScreen('#scannerScreen');
});

//RESTART GAME

$(".restartButton").click(function () {
    $('#confirmRestartModal').modal('show');
});

$("#confirmRestartButton").click(function () {
    resetGame();
    checkIfPlayerReady(); // Check if player is ready
    checkPlayerReadyInterval = setInterval(checkIfPlayerReady, 5000); //check every 5 seconds if player is in the startzone and has typed its name
    $('#confirmRestartModal').modal('hide');
    showScreen('#startScreen');
});

function resetGame() {
    localStorage.clear(); //reset local storage
    resetGlobalVariables(); //reset global variables
    resetContent(); //reset content
}

function resetContent() {
    setClothing('images/alien.png'); //reset alien image
    showClothing(); //reset custom screen
    updateName(); //reset name
    updateBag(); //reset bag
    updateScannerScreen(); //reset scanner screen
    updateVictoryPhoto(); //reset victory photo
}

function resetGlobalVariables() {
    playerName = '';

    currentScene = '';
    dialogueIndex = 0;

    currentHatIndex = 0;
    currentGlassesIndex = 0;
    currentBeardIndex = 0;
    currentClothesIndex = 0;

    collectedParts.clear();
    solvedMarkers.clear();
    isUfoRepaired = false;
    victoryPhoto = '';
};

//MARKER HANDLING
function solveMarker(markerId) {
    solvedMarkers.add(markerId);
    localStorage.setItem('solvedMarkers', JSON.stringify([...solvedMarkers]));
    updateScannerScreen();
}

function loadSolvedMarkers() {
    const loadedMarkers = JSON.parse(localStorage.getItem('solvedMarkers'));
    if (loadedMarkers) {
        solvedMarkers = new Set(loadedMarkers);
    }
    updateScannerScreen();
}

function updateScannerScreen() {
    //Update ScannerTextboxTitle
    $("#scannerTextboxTitle").text('Scanner');
    //Remove Interaction Buttons
    $('#interactButton').addClass('d-none');
    $('#repairButton').addClass('d-none');
    $('#photoButton').addClass('d-none');

    //Update ScannerTextboxContent
    if (isUfoRepaired) {
        $("#scannerTextboxContent").text('Scanne den Marker, um ein Abschiedsfoto aufzunehmen!');
    } else if (solvedMarkers.has('1') == false) {
        $("#scannerTextboxContent").text('Scanne den ersten Marker am Startpunkt, bevor du ins Labyrinth gehst!');
    } else if (solvedMarkers.size == 6) {
        $("#scannerTextboxContent").text('Dir fehlt nur noch ein Teil! 5 Teile sind aber ausreichend, um zum Raumschiff zurückzukehren!');
    } else if (solvedMarkers.size == 7) {
        $("#scannerTextboxContent").text('Du hast alle Teile gefunden! Kehre zurück zum Raumschiff, um es zu reparieren!');
    } else {
        $("#scannerTextboxContent").text('Finde und scanne einen Marker!');
    }

    //BUTTON HANDLING
    //Hide bag button
    if (isUfoRepaired) {
        $('#bagButton').addClass('d-none');
        $('#settingButton').addClass('d-none');
    } else if (solvedMarkers.has('1') == false) {
        $('#bagButton').addClass('d-none');
        $('#settingButton').removeClass('w-25 ml-2 d-none').text(' Einstellungen');
        //Show bag button
    } else {
        $('#bagButton').removeClass('d-none');
        $('#settingButton').removeClass('d-none').addClass('w-25 ml-2').text('');

    }
}


$(window).on('message', function (event) {
    // Normalize event object from jQuery event
    var originalEvent = event.originalEvent;
    var markerId = originalEvent.data.data;
    const marker = markersData.find(marker => marker.id === markerId);
    const solved = solvedMarkers.has(markerId);

    //if Ufo is repaired make a photo
    if (originalEvent.data.action == 'found' && markerId == '1' && isUfoRepaired) {
        $("#scannerTextboxTitle").text(marker.photo.speaker);
        $("#scannerTextboxContent").text(marker.photo.text);
        $('#bagButton').addClass('d-none');
        $('#settingButton').addClass('d-none');
        $('#photoButton').removeClass('d-none');
        $("#photoButton").click(function () {
            takePhoto();
            $('#photoButton').addClass('d-none');
            $('#againPhotoButton').removeClass('d-none');
            $('#confirmPhotoButton').removeClass('d-none');

        });
        //if first marker is scanned after at least 5 of 6 parts are collected
    } else if (originalEvent.data.action == 'found' && markerId == '1' && solvedMarkers.size >= 6) {
        $("#scannerTextboxTitle").text(marker.completed.speaker);
        $("#scannerTextboxContent").text(marker.completed.text);
        $('#bagButton').addClass('d-none');
        $('#settingButton').addClass('d-none');
        $('#repairButton').removeClass('d-none');
        $("#repairButton").click(function () {
            repairUfo();
            showScreen('#dialogueScreen');
            showScene('scene11');
        });
        //if unsolved marker found, show preScan interaction
    } else if (originalEvent.data.action == 'found' && !solved) {
        $("#scannerTextboxTitle").text(marker.preScan.speaker);
        $("#scannerTextboxContent").text(marker.preScan.text);
        $('#interactButton').removeClass('d-none');
        $('#bagButton').addClass('d-none');
        $('#settingButton').addClass('d-none');
        $("#interactButton").click(function () {
            showScreen('#dialogueScreen');
            showScene('scene' + marker.id);
        });
        //if solved Marker found, show postScan interaction
    } else if (originalEvent.data.action == 'found' && solved) {
        $("#scannerTextboxTitle").text(marker.postScan.speaker);
        $("#scannerTextboxContent").text(marker.postScan.text);
        $('#interactButton').addClass('d-none');
        //marker lost, before first marker is solved
    } else if (originalEvent.data.action == 'lost') {
        updateScannerScreen();
    }
});

//HANDLING UFO STATUS
function repairUfo() {
    isUfoRepaired = true;
    localStorage.setItem('isUfoRepaired', JSON.stringify(isUfoRepaired));
}

function loadUfoStatus() {
    isUfoRepaired = JSON.parse(localStorage.getItem('isUfoRepaired')) || false;
}

//HANDLING PLAYERNAME
function setName(name) {
    playerName = name;
    localStorage.setItem('playerName', playerName);
    updateName();
}

function loadName() {
    const name = localStorage.getItem('playerName');
    if (name) {
        playerName = name;
        updateName(playerName);
    } else {
        checkIfPlayerReady(); // Check if player is ready on page load
        checkPlayerReadyInterval = setInterval(checkIfPlayerReady, 5000); //check every 5 seconds if player is in the startzone and has typed its name
    }

}

function updateName() {
    $('#nameInput').val(playerName);
    $("#settingTextboxContent").text("Brauchst du Hilfe, " + playerName + "?");
}


//HANDLING VICTORY PHOTO
//tell ar-frame to take a photo
function takePhoto() {
    var iframe = document.getElementsByTagName('iframe');
    iframe.contentWindow.postMessage({
        action: 'takePhoto'
    }, '*');
}

//receives photo from ar-frame
$(window).on('message', function (event) {
    var originalEvent = event.originalEvent.data;

    if (originalEvent.action == 'tookPhoto') {
        var photo = originalEvent.data
        setVictoryPhoto(photo);
    }
});

//load victory photo
function loadVictoryPhoto() {
    var loadedPhoto = localStorage.getItem('victoryPhoto') || '';
    setVictoryPhoto(loadedPhoto);
}

//set victory photo
function setVictoryPhoto(photo) {
    if (photo) {
        victoryPhoto = photo;
        localStorage.setItem('victoryPhoto', victoryPhoto);
    }
    updateVictoryPhoto();
}

//update victory photo
function updateVictoryPhoto() {
    $('#victoryPhoto').attr('src', victoryPhoto);
    $("#downloadButton").attr('href', victoryPhoto);
    $("#endTextboxTitle").text("Danke für's Spielen!");
    $("#endTextboxContent").text(playerName + ', du hast es geschafft!');
}

function newPhoto() {
    $('#photoButton').addClass('d-none');
    $('#againPhotoButton').addClass('d-none');
    $('#confirmPhotoButton').addClass('d-none');

    victoryPhoto = null;
    startCamera();
}

function startCamera() {
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.contentWindow.postMessage({
        action: 'startCamera'
    }, '*');
}

//take a new Victory Photo
$('#againPhotoButton').click(function () {
    newPhoto();
});

//take a new Victory Photo
$('#anotherPhotoButton').click(function () {
    newPhoto();
    showScreen('#scannerScreen');
});

//confirm Victory Photo
$('#confirmPhotoButton').click(function () {
    $('#againPhotoButton').addClass('d-none');
    $('#confirmPhotoButton').addClass('d-none');
    startCamera();
    showScreen('#victoryScreen');
});