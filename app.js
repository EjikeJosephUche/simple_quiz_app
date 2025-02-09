
import { questions } from './questions.js';
const questionDisplayElement = document.getElementById("question");
let currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const optionsElement = document.getElementById("options");
const prevButtonElement = document.getElementById("previous");
const nextButtonElement = document.getElementById("next");

let correctlyAnsweredQuestions = 0;
let currentQuestionIndex = 0;

nextButtonElement.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestions();
    } else {
        showResults();
    }
});

prevButtonElement.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestions();
    }
});

// Function to load the current question and options
function loadQuestions() {
    const currentQuestion = questions[currentQuestionIndex].question;
    const currentOptions = questions[currentQuestionIndex].options;
    
    // Display the current question
    questionDisplayElement.innerHTML = currentQuestion;
    
    // Display the progress indicator
    currentQuestionElement.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Display the options
    optionsElement.innerHTML = '';
    currentOptions.forEach((option) => {
        let button = document.createElement("button");
        button.classList.add("option");
        button.innerHTML = option;
        optionsElement.appendChild(button);
        
        button.addEventListener("click", () => {
            checkAnswer(option);
        });
    });
}

// Function to check the user's selected answer

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    // Mark the selected option with a "selected" class
    const allOptions = optionsElement.querySelectorAll(".option");
    allOptions.forEach(optionButton => {
        optionButton.disabled = true;
        // If the button is the selected answer, apply the "selected" class
        if (optionButton.innerHTML === selectedAnswer) {
            optionButton.classList.add("selected");
        } else {
            // Optionally, you could disable other options or leave them unchanged
            // optionButton.classList.remove("selected");
        }
    });

    // If the selected answer is correct, increase the score
    if (selectedAnswer === correctAnswer) {
        correctlyAnsweredQuestions++;
    }
}


// Function to show the results after completing the quiz
function showResults() {
    const resultMessage = `You have completed the quiz! Your score is ${correctlyAnsweredQuestions} out of ${questions.length}.`;
    questionDisplayElement.innerHTML = resultMessage;
    
    // Hide the options and navigation buttons
    optionsElement.style.display = "none";
    prevButtonElement.style.display = "none";
    nextButtonElement.style.display = "none";
    
    // Ask the user if they want to restart the quiz
    const restartMessage = document.createElement("p");
    restartMessage.innerHTML = "Would you like to restart the quiz?";

    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Yes, Restart!";
    restartButton.classList.add("restart-button");
    restartButton.addEventListener("click", restartQuiz);

    const quitButton = document.createElement("button");
    quitButton.innerHTML = "No, Quit";
    quitButton.classList.add("quit-button");
    quitButton.addEventListener("click", () => {
        alert("Thank you for playing!");
    });

    questionDisplayElement.appendChild(restartMessage);
    questionDisplayElement.appendChild(restartButton);
    questionDisplayElement.appendChild(quitButton);
}

// Function to restart the quiz
function restartQuiz() {
    // Reset the score and question index
    correctlyAnsweredQuestions = 0;
    currentQuestionIndex = 0;
    
    // Show the options and navigation buttons again
    optionsElement.style.display = "block";
    prevButtonElement.style.display = "inline-block";
    nextButtonElement.style.display = "inline-block";
    
    // Remove the restart buttons and message
    const restartMessage = document.querySelector("p");
    const restartButton = document.querySelector(".restart-button");
    const quitButton = document.querySelector(".quit-button");
    restartMessage.remove();
    restartButton.remove();
    quitButton.remove();

    // Reload the first question
    loadQuestions();
}

// Initialize the quiz by loading the first question
loadQuestions();
