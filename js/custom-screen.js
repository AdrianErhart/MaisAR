$("#chooseHat").click(function () {
    currentHatIndex = (currentHatIndex + 1) % hats.length;
    showClothing();
});

$("#chooseGlasses").click(function () {
    currentGlassesIndex = (currentGlassesIndex + 1) % glasses.length;
    showClothing();
});

$("#chooseBeard").click(function () {
    currentBeardIndex = (currentBeardIndex + 1) % beards.length;
    showClothing();
});

$("#chooseClothes").click(function () {
    currentClothesIndex = (currentClothesIndex + 1) % clothes.length;
    showClothing();
});

function showClothing() {
    $("#hatImg").attr("src", hats[currentHatIndex]).show();
    $("#glassesImg").attr("src", glasses[currentGlassesIndex]).show();
    $("#beardImg").attr("src", beards[currentBeardIndex]).show();
    $("#clothesImg").attr("src", clothes[currentClothesIndex]).show();
}

$("#saveCustom").click(function () {
    $('#confirmCustomModal').modal('show');
});

$("#confirmCustom").click(function () {
    combineClothing().then(() => {
        $('#confirmCustomModal').modal('hide'); // Hide modal after saving
        solveMarker('1');
        showScreen('#dialogueScreen');
        showScene('scene10');
    })
});

function combineClothing() {
    return new Promise((resolve) => {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 500; // Adjust as needed
        canvas.height = 500; // Adjust as needed

        // Load your images
        var alienImg = new Image();
        var hatImg = new Image();
        var glassesImg = new Image();
        var beardImg = new Image();
        var clothesImg = new Image();

        // Set source paths
        alienImg.src = entities.alien.img;
        hatImg.src = hats[currentHatIndex];
        glassesImg.src = glasses[currentGlassesIndex];
        beardImg.src = beards[currentBeardIndex];
        clothesImg.src = clothes[currentClothesIndex];

        // Ensure all images load before drawing
        var imagesLoaded = 0;

        alienImg.onload = imageLoaded;
        hatImg.onload = imageLoaded;
        glassesImg.onload = imageLoaded;
        beardImg.onload = imageLoaded;
        clothesImg.onload = imageLoaded;

        function imageLoaded() {
            imagesLoaded++;
            if (imagesLoaded === 5) { // Total number of images
                drawImages();
            }
        }

        // Function to draw images on canvas
        function drawImages() {
            ctx.drawImage(alienImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(clothesImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(glassesImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(beardImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(hatImg, 0, 0, canvas.width, canvas.height);

            // Export the canvas as an image
            var combinedAlienImg = canvas.toDataURL('image/png');
            setClothing(combinedAlienImg);
            resolve();
        }
    });


}

function loadClothing() {
    var combinedAlienImg = localStorage.getItem('combinedAlienImg');
    if (combinedAlienImg) {
        setClothing(combinedAlienImg);
    }
}

function setClothing(combinedAlienImg) {
    entities.alien.img = combinedAlienImg;
    localStorage.setItem('combinedAlienImg', combinedAlienImg);
    //change alien image in arScene too
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.contentWindow.postMessage({
        action: 'changeSrc',
        data: combinedAlienImg
    }, '*');

}