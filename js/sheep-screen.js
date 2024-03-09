var actualSheepCount = 50; // Set the actual number of sheep
var timeLeft = 20;

$('#startCount').click(function () {
  $('#unknownImage').addClass('d-none'); // Hide the unknown image
  $('#sheepImage').removeClass('d-none'); // Show the sheep image
  $('#startCount').hide(); //hide start button
  $('#timer').text(timeLeft); //show timer
  $('#timer').removeClass('d-none'); //show timer

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      timeIsUp();
    } else {
      $('#timer').text(--timeLeft);
    }
  }

  function timeIsUp() {
    $('#sheepImage').addClass('d-none'); // Hide the sheep image
    $('#unknownImage').removeClass('d-none'); // show the unknown image
    $('#timer').addClass('d-none'); // Hide the timer
    $('#sheepTextbox').addClass('d-none'); // Hide the Textbox
    $('#sheepInputForm').removeClass('d-none'); // Show the input form
  }

});

$('#sheepSave').click(function () {
  var sheepCountInput = $('#sheepInput').val();
  if ($.isNumeric(sheepCountInput)) {
    var sheepCount = parseInt(sheepCountInput, 10);
    var difference = Math.abs(sheepCount - actualSheepCount);

    //show result
    if (difference == 0) {
      $('#sheepTextboxTitle').text(`Richtig!`);
    } else if (difference <= 10) {
      $('#sheepTextboxTitle').text(`Knapp vorbei ist auch daneben!`);
    } else if (difference >= 10) {
      $('#sheepTextboxTitle').text(`Weit vorbei ist auch daneben!`);
    }
  
    $('#sheepTextboxContent').text(`Es waren ${actualSheepCount} Schafe zu sehen.`);
    $('#sheepInputForm').addClass('d-none'); // Hide the form
    $('#sheepTextbox').removeClass('d-none'); // Show updated content
    
    //show the sheep image again
    $('#unknownImage').addClass('d-none'); // Hide the unknown image
    $('#sheepImage').removeClass('d-none'); // Show the sheep image
    //show next button
    $('#nextSloth').removeClass('d-none'); // Show next button
  }
});

$('#sheepInput').on('input', function () {
  var isValidNumber = $.isNumeric($(this).val());
  $('#sheepSave').prop('disabled', !isValidNumber);
});

$('#nextSloth').on('click', function () {
  solveMarker('6');
  collectPart('navigation');
  showScreen('#dialogueScreen')
  showScene('scene60');
});