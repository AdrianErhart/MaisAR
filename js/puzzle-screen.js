var rows = 3;
var columns = 3;
var turns = 0;
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function createPuzzle() {
    var idCounter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = $('<img>').attr({
                src: 'images/puzzle/' + imgOrder.shift() + '.png',
                id: idCounter,
                draggable: true
            }).addClass('puzzle-piece');

            $('#board').append(tile);
            idCounter++;
        }
    }
    addDragDrop();
}

function addDragDrop() {
    $('.puzzle-piece').draggable({
        containment: '#board',
        cursor: 'move',
        revert: true,
        zIndex: 1000,
        start: function (event, ui) {
            $(this).css('zIndex', 1003); // Increase zIndex when dragging starts
        }
    });

    $('.puzzle-piece').droppable({
        drop: function (event, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            var tempSrc = dropped.attr('src');
            dropped.attr('src', droppedOn.attr('src'));
            droppedOn.attr('src', tempSrc);

            turns++;
            $('#turns').text('Turns: ' + turns);

            // After swapping, ensure both pieces have the same zIndex
            $('.puzzle-piece').css('zIndex', 1000); //all pieces on 1000
            dropped.css('zIndex', 1001); // the one switching places on 1001
            droppedOn.css('zIndex', 1002); //the one dropped down on 1002
            checkOrderAndFinishGame();
        }
    });
}

function checkOrderAndFinishGame() {
    var currentOrder = $('.puzzle-piece').map(function () {
        return $(this).attr('src').replace('images/puzzle/', '').replace('.png', '');
    }).get();

    if (arraysEqual(currentOrder, correctOrder)) {
        $('.puzzle-piece').draggable('disable');

        setTimeout(function () {
            // Load new pictures with green cable when puzzle is solved
            $('#1').attr('src', 'images/puzzle/1_after.png');
            $('#2').attr('src', 'images/puzzle/2_after.png');
            $('#3').attr('src', 'images/puzzle/3_after.png');
            $('#4').attr('src', 'images/puzzle/4_after.png');
            $('#5').attr('src', 'images/puzzle/5_after.png');
            $('#6').attr('src', 'images/puzzle/6_after.png');
            $('#7').attr('src', 'images/puzzle/7_after.png'); 
            $('#8').attr('src', 'images/puzzle/8_after.png');
            $('#9').attr('src', 'images/puzzle/9_after.png');
            setTimeout(function () {
                solveMarker('3');
                collectPart('accu');
                showScreen('#dialogueScreen')
                showScene('scene30');
            }, 2000);
        }, 1000);


    }
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

createPuzzle();