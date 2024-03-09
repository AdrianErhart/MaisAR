//Quiz
const quizQuestions = [{
    question: "Wie viele Planeten gehören zu unserem Sonnensystem?",
    answers: [{
        text: "acht",
        correct: true
      },
      {
        text: "neun",
        correct: false
      },
      {
        text: "zehn",
        correct: false
      },
      {
        text: "elf",
        correct: false
      }
    ]
  },
  {
    question: "Welcher Planet ist der Sonne am nächsten?",
    answers: [{
        text: "Erde",
        correct: false
      },
      {
        text: "Merkur",
        correct: true
      },
      {
        text: "Venus",
        correct: false
      },
      {
        text: "Mars",
        correct: false
      }
    ]
  },
  {
    question: "Welcher Planet wird auch der rote Planet genannt?",
    answers: [{
        text: "Mars",
        correct: true
      },
      {
        text: "Saturn",
        correct: false
      },
      {
        text: "Jupiter",
        correct: false
      },
      {
        text: "Venus",
        correct: false
      }
    ]
  },
  {
    question: "Welcher Planet ist so hell, dass er manchmal sogar am Tag von der Erde aus beobachtet werden kann?",
    answers: [{
        text: "Jupiter",
        correct: false
      },
      {
        text: "Uranus",
        correct: false
      },
      {
        text: "Neptun",
        correct: false
      },
      {
        text: "Venus",
        correct: true
      }
    ]
  },
  {
    question: "Welchen Planeten nennt man auch Herrn der Ringe?",
    answers: [{
        text: "Jupiter",
        correct: false
      },
      {
        text: "Saturn",
        correct: true
      },
      {
        text: "Neptun",
        correct: false
      },
      {
        text: "Mars",
        correct: false
      }
    ]
  }
];

let currentQuestionIndex = 0;

function displayQuestion(index) {
  //show question
  const question = quizQuestions[index];
  $('#question').text(question.question);
  $('#answers').empty();
  //add answer buttons
  question.answers.forEach(answer => {
    const button = $('<button class="w-100 btn my-2"></button>');
    button.text(answer.text);
    button.on('click', function () {
      $('.answer-btn').off('click').addClass('disabled');
       // Disable all answer buttons after a choice is made
      if (answer.correct) {
        $(this).addClass('btn-success');
        $('#answers').append(`<div class="my-2">Richtige Antwort!</div>`);
        $('#next').show().text('Nächste Frage');
      } else {
        $(this).addClass('btn-danger');
        $('#answers').append(`<div class="my-2">Falsche Antwort. </div>`);
        $('#next').show().text('Zum Anfang');
      }
      //increase question index if next button is clicked
      $('#next').off('click').on('click', function () {
        if (answer.correct) {
          currentQuestionIndex++;
          if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion(currentQuestionIndex);
          } else {
            // Handle quiz completion
            solveMarker('4');
            collectPart('headlight');
            showScreen('#dialogueScreen')
            showScene('scene40');
          }
        } else {
          currentQuestionIndex = 0; // Restart from the first question if the answer was wrong
          displayQuestion(currentQuestionIndex);
        }
        $(this).hide();
      });
    });
    button.addClass('answer-btn btn-primary'); // Add classes back dynamically
    $('#answers').append(button);
  });
  $('#next').hide(); // Ensure the Next button is hidden each time a question is displayed
}


$(document).ready(function () {
  displayQuestion(currentQuestionIndex);
});