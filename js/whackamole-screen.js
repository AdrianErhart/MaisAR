let lastHole;
let score = 10;

$('#startWhackamole').click(function () {
    $(this).hide();
    startGame();
});

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes.eq(idx);
    if (hole[0] === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole[0];
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole($('.hole'));
    hole.addClass('up');
    setTimeout(() => {
        hole.removeClass('up');
        if (!(score == 0)) peep();
    }, time);
}

function startGame() {
    $('.score').text(10);
    score = 10;
    peep();
}

$('.mole').click(function () {
    if (!$(this).is(':visible')) return;
    score--;
    $(this).parent().removeClass('up');
    $('.score').text(score);
    if (score == 0) {
        solveMarker('5');
        collectPart('steeringwheel');
        showScreen('#dialogueScreen')
        showScene('scene50');
    }
});