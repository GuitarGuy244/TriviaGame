var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [
  {
    question: "What was the first film in the Marvel Cinematic Universe(MCU)?",
    answers: [
      "Iron Man",
      "The Incredible Hulk",
      "Captain Amercia: The First Avenger",
      "Thor"
    ],
    correctAnswer: "Iron Man",
    image: "assets/images/iron-man.gif"
  },
  {
    question: "Which movie comes first chronologically in the MCU?",
    answers: [
      "Captain Amercia: The First Avenger",
      "Thor",
      "The Incredible Hulk",
      "Guardians of The Galaxy"
    ],
    correctAnswer: "Captain Amercia: The First Avenger",
    image: "assets/images/Captain-America.gif"
  },
  {
    question: "In which movie those Ant-man NOT appear in?",
    answers: [
      "Ant-man",
      "Avengers: Infinity War",
      "Captain America: Civil War",
      "Avengers: Endgame"
    ],
    correctAnswer: "Avengers: Infinity War",
    image: "assets/images/Spider-man-Infinity-war.gif"
  },
  {
    question: "In which movie does Black-widow first appear?",
    answers: [
      "Iron Man",
      "Thor: The Dark World",
      "Iron Man 2",
      "Marvel's The Avengers"
    ],
    correctAnswer: "Iron Man 2",
    image: "assets/images/black-widow.gif"
  },
  {
    question: "In what film did Thanos first make a cameo/appeared?",
    answers: [
      "Avengers: Endgame",
      "Avengers: Infinity War",
      "The Avengers",
      "Avengers: Age of Ultron"
    ],
    correctAnswer: "The Avengers",
    image: "assets/images/thanos.gif"
  },
  {
    question: "In how many movies does Hawkeye appear?",
    answers: ["6", "9", "5", "3"],
    correctAnswer: "5",
    image: "assets/images/hawkeye.gif"
  },
  {
    question: "In Avengers: Endgame who kills Thanos once and for all?",
    answers: ["Captain America", "Thor", "Hulk", "Iron Man"],
    correctAnswer: "Iron Man",
    image: "assets/images/iron-man-snap.gif"
  },
  {
    question: "How many movies are there in the MCU?",
    answers: ["22", "23", "15", "10"],
    correctAnswer: "23",
    image: "assets/images/marvel.gif"
  }
];

// Variable to hold our setInterval
var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append(
        "<button class='answer-button' id='button' data-name='" +
          questions[this.currentQuestion].answers[i] +
          "'>" +
          questions[this.currentQuestion].answers[i] +
          "</button>"
      );
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {
    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer
    );
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append(
      "<h3>Unanswered: " +
        (questions.length - (game.incorrect + game.correct)) +
        "</h3>"
    );
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if (
      $(e.target).attr("data-name") ===
      questions[this.currentQuestion].correctAnswer
    ) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Nope!</h2>");
    card.append(
      "<h3>The Correct Answer was: " +
        questions[game.currentQuestion].correctAnswer +
        "</h3>"
    );
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend(
    "<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>"
  );
  game.loadQuestion();
});
