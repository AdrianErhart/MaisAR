//when marker found, message parentWindow
$('a-marker').each(function () {
    $(this).on('markerFound', function () {
        const markerId = $(this).attr('value');
        window.parent.postMessage({
            action: 'found',
            data: markerId
        }, '*');
    });
});

//when marker lost, message parentWindow
$('a-marker').each(function () {
    $(this).on('markerLost', function () {
        const markerId = $(this).attr('value');
        window.parent.postMessage({
            action: 'lost',
            data: markerId
        }, '*');
    });
});

//update alien image on marker
$(window).on('message', function (event) {
    var originalEvent = event.originalEvent;
    if (originalEvent.data.action === 'changeSrc') {
        document.getElementById('arAlienImg').setAttribute('src', originalEvent.data.data);
    }
});

//take photo
$(window).on('message', function (event) {
    var originalEvent = event.originalEvent;
    if (originalEvent.data.action === 'takePhoto') {

        //pause Video
        const video = document.querySelector("video");
        video.pause();

        const canvas = document.createElement("canvas");

        // Obtain the view style data of the video
        const style = window.getComputedStyle(video),
            width = parseFloat(style.getPropertyValue('width')),
            height = parseFloat(style.getPropertyValue('height')),
            top = parseFloat(style.getPropertyValue('top')),
            left = parseFloat(style.getPropertyValue('left'));

        // The width and height of the video may exceed the screen to achieve a full screen effect, 
        // so screenshots need to only capture the visible part of the video.
        const imgLeft = left * video.videoWidth / width
        const imgTop = top * video.videoHeight / height
        const drawLeft = imgLeft > 0 ? 0 : imgLeft
        const drawTop = imgTop > 0 ? 0 : imgTop
        const drawWidth = video.videoWidth
        const drawHeight = video.videoHeight
        canvas.width = video.videoWidth + imgLeft * 2
        canvas.height = video.videoHeight + imgTop * 2

        // render
        canvas.getContext('2d').drawImage(video, drawLeft, drawTop, drawWidth, drawHeight);

        let imgData = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');

        canvas.getContext('2d')
            .drawImage(imgData, drawLeft, drawTop, drawWidth, drawHeight);

        var photo = canvas.toDataURL('image/png');

        window.parent.postMessage({
            action: 'tookPhoto',
            data: photo
        }, '*');
    }
});

//play video in order to take a new picture
$(window).on('message', function (event) {
    var originalEvent = event.originalEvent;
    if (originalEvent.data.action === 'startCamera') {
        const video = document.querySelector("video");
        video.play()
    }
});