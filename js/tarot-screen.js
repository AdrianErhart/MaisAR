//Memory
const tarotCards = document.querySelectorAll('.tarot-card');

//load all pictures
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tarot-card').forEach(card => {
        const tarotPicture = card.getAttribute('data-picture');
        const tarotFrontImg = card.querySelector('.front-face');
        const tarotBackImg = card.querySelector('.back-face');

        tarotFrontImg.src = entities[tarotPicture].img;
        tarotBackImg.src = entities.crystalball.img; // Assuming every card uses the same back-face image
    });
});

function flipTarotCard() {
    this.classList.add('flip');
    tarotCards.forEach(card => card.removeEventListener('click', flipTarotCard));

    var tarotCard = this.getAttribute('data-picture');
    $('#tarotTextboxContent').text(entities[tarotCard].name + "! " + entities[tarotCard].description);
    $('#nextRaven').removeClass('d-none'); // Show next button
}

$('#nextRaven').on('click', function () {
    solveMarker('7');
    collectPart('turbine');
    showScreen('#dialogueScreen')
    showScene('scene70');
});

(function shuffle() {
    tarotCards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

tarotCards.forEach(card => card.addEventListener('click', flipTarotCard));