const startButton = document.getElementById("start");
const questionsContainer = document.getElementById("questions");
const choicesContainer = document.getElementById("choices");
const questionTitle = document.getElementById("question-title");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const time = document.getElementById("time");

// Keep track of current question index and score
let currentQuestionIndex = 0;
let score = 0;

// Keep track of time left
let secondsLeft = 60;

// Keep track of the timer
let timerId;

// Start the quiz when the start button is clicked
startButton.addEventListener("click", startQuiz);

function countdown() {
    secondsLeft--;
    time.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      endQuiz();
    }
  }
// Start the quiz
function startQuiz() {
  // Hide the start button
  startButton.classList.add("hide");

  // Show the questions container
  questionsContainer.classList.remove("hide");

  // Reset the current question index and score
  currentQuestionIndex = 0;
  score = 0;

  // Reset the time
  secondsLeft = 60;
  time.textContent = secondsLeft;

  // Start the timer
  timerId = setInterval(countdown, 1000);

  // Display the first question
  displayQuestion();
}

// Display the current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  choicesContainer.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.setAttribute("value", choice);
    button.addEventListener("click", selectAnswer);
    choicesContainer.appendChild(button);
  });
}

// Handle the user's selected answer
function selectAnswer(event) {
  const selectedAnswer = event.target.value;
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    feedback.textContent = "Correct!";
    score++;
  } else {
    feedback.textContent = "Incorrect!";
    secondsLeft -= 2;
  }
  feedback.classList.remove("hide");
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

function submitScore() {
    const initials = initialsInput.value;
    const finalScore = score;
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ initials, finalScore });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
  submitButton.addEventListener("click", submitScore);

  const highscores = JSON.parse(localStorage.getItem("highscores"));
  if (highscores) {
    highscores.forEach((score) => {
      const li = document.createElement("li");
      li.textContent = `${score.initials} - ${score.finalScore}`;
      highscoresList.appendChild(li);
    });
  }

// End the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerId);

  // Hide the questions container
  questionsContainer.classList.add("hide");

  // Show the end screen
  endScreen.classList.remove("hide");

  // Display the final score
  finalScore.textContent = score;

  // check if the time is up
  if(secondsLeft <= 0){
    alert("Time is up!")
  }
  window.location.href = "highscores.html"
}