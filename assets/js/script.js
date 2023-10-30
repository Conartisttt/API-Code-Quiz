const introDiv = document.getElementById("intro");
const startButton = document.getElementById("start");
const questionSection = document.getElementById("questions");
const choiceSection = document.getElementById("choices");
const responseSection = document.getElementById("response");
const timerSection = document.getElementById("timer");
const timeLeftSpan = document.getElementById("timeleft");
const scoreSection = document.getElementById("score");
const highScoreSection = document.getElementById("highscores");
const nextQuestionBtn = document.createElement("button");
const mainSection = document.getElementById("main");

//Event Listeners for Buttons
nextQuestionBtn.addEventListener("click", nextQuestion);
startButton.addEventListener("click", startQuiz);
choiceSection.addEventListener("click", evaluateAnswer);

//Variable to identify which question to display to user, and to initialize that timer has not started
let questionIndex = 0;
let timerOn = false;

//Questions for Quiz
const questions = [
    {
        "question": "Which is not a data type in JavaScript?",
        "a": "string",
        "b": "number",
        "c": "letter",
        "d": "boolean",
        "answer": "letter"
    },
    {
        "question": "Who invented JavaScript?",
        "a": "Brendan Eich",
        "b": "Tom Arnold",
        "c": "James McCaffery",
        "d": "Todd Phillips",
        "answer": "Brendan Eich"
    },
    {
        "question": "What is a \"for\" loop used for?",
        "a": "to set a conditional statement for a function to execute",
        "b": "to repeat a specific block of cocde a known number of times",
        "c": "to interpret data used by data centers",
        "d": "to create a circle of fors that allows code to go round and round",
        "answer": "to repeat a specific block of cocde a known number of times"
    },
    {
        "question": "JavaScript is a.......",
        "a": "computer software that allows you type code twice as fast as HTML",
        "b": "a mechanism for downloading code from codebases and using them in your editor",
        "c": "a type of computer specifically made for computer programers",
        "d": "a prototype-based object-oriented programming language",
        "answer": "a prototype-based object-oriented programming language"
    },
    {
        "question": "Which is not a way to declare a JavaScript variable?",
        "a": "var",
        "b": "is",
        "c": "let",
        "d": "const",
        "answer": "is"
    },
]

//Timer Section
let timerInterval;
let timeLeft = 60;

function setTime() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;

        if (timeLeft <= 0 || questionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }

    }, 1000);
}

//Function called to display each question on page
function startQuiz() {
    if (!timerOn) {
        setTime()
        timerSection.classList.remove("hide");
    }
    if (timeLeft === 0 || questionIndex >= questions.length) {
        clearInterval(timerInterval);
    } else {
        timerOn = true;
        mainSection.classList.remove("hide");
        introDiv.classList.add("hide");
        startButton.classList.add("hide");
        const question = document.createElement("h2");
        const choiceList = document.createElement("ul");
        const choiceA = document.createElement("button");
        const choiceB = document.createElement("button");
        const choiceC = document.createElement("button");
        const choiceD = document.createElement("button");
        question.textContent = questions[questionIndex].question;
        choiceA.textContent = questions[questionIndex].a;
        choiceB.textContent = questions[questionIndex].b;
        choiceC.textContent = questions[questionIndex].c;
        choiceD.textContent = questions[questionIndex].d;
        questionSection.appendChild(question);
        choiceSection.appendChild(choiceList);
        choiceList.appendChild(choiceA);
        choiceList.appendChild(choiceB);
        choiceList.appendChild(choiceC);
        choiceList.appendChild(choiceD);
    }
}

//Function called when user clicks a multiple choice answer to evaluate it
function evaluateAnswer(event) {
    const answer = event.target;
    if (answer.matches("button")) {
        if (answer.textContent == questions[questionIndex].answer) {
            clearInterval(timerInterval);
            questionSection.classList.add("hide");
            choiceSection.classList.add("hide");
            const correctAnswer = document.createElement("h3");
            correctAnswer.classList.add("correct");
            correctAnswer.textContent = "That's Correct!";
            responseSection.appendChild(correctAnswer);
            console.log("thats correct!")

        } else {
            clearInterval(timerInterval);
            questionSection.classList.add("hide");
            choiceSection.classList.add("hide");
            const incorrectAnswer = document.createElement("h3");
            incorrectAnswer.classList.add("incorrect");
            incorrectAnswer.textContent = "That's Incorrect!";
            responseSection.appendChild(incorrectAnswer);
            timeLeft = timeLeft - 10;
            console.log("that's not correct")
        }
        nextQuestionBtn.textContent = "Next Question";
        responseSection.appendChild(nextQuestionBtn);
    } else {
        return;
    }
}

//Function called when next question button is hit to hide elements, call startQuiz to display next question, and call setTime to update timer
function nextQuestion() {
    questionIndex++;
    questionSection.classList.remove("hide");
    choiceSection.classList.remove("hide");
    responseSection.textContent = "";
    questionSection.textContent = "";
    choiceSection.textContent = "";
    startQuiz();
    setTime();
}

//Function called when timer reaches 0 or all questions are answered, calls setScore function
function endQuiz() {
    console.log("quiz ending");
    responseSection.textContent = "";
    questionSection.textContent = "";
    choiceSection.textContent = "";
    timerSection.textContent = "";
    setScore();
};

//Function called at end of quiz to enter user initals and log score to local storage
function setScore() {
    const highScoreArr = JSON.parse(localStorage.getItem("scores")) || "";
    const scoreForm = document.createElement("form");
    const scoreHeader = document.createElement("h3");
    scoreHeader.textContent = "Your Score: " + timeLeft;
    const initialLabel = document.createElement("label");
    initialLabel.setAttribute("for", "initials");
    initialLabel.textContent = "Enter Initials:"
    const initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text")
    initialInput.setAttribute("id", "initials")
    const initialSubmit = document.createElement("input");
    initialSubmit.setAttribute("type", "submit");
    initialSubmit.setAttribute("value", "Submit");
    initialSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        const userID = initialInput.value
        const userScore = timeLeft;
        const userData = userID + ": " + userScore;
        if(!userID) {
            alert("You must enter initials");
            return;
        }
        highScoreArr.unshift(userData);
        localStorage.setItem("scores", JSON.stringify(highScoreArr));
        renderHighScores();
        scoreSection.classList.add("hide");
    });
    scoreForm.appendChild(scoreHeader);
    scoreForm.appendChild(initialLabel);
    scoreForm.appendChild(initialInput);
    scoreForm.appendChild(initialSubmit);
    scoreSection.appendChild(scoreForm);
}

//Renders the scores stored in local storage to the page
function renderHighScores() {
    const scoreBoard = JSON.parse(localStorage.getItem("scores")) || "";
    console.log(scoreBoard);
    highScoreSection.classList.remove("hide");
    const scoreBoardHeader = document.createElement("h2");
    scoreBoardHeader.textContent = "HighScores:";
    highScoreSection.appendChild(scoreBoardHeader);
    const indivScoreList = document.createElement("ul");
    scoreBoardHeader.appendChild(indivScoreList);
    for (let i = 0; i < scoreBoard.length; i++) {
        const indivScore = document.createElement("li");
        indivScore.textContent = scoreBoard[i];
        indivScoreList.appendChild(indivScore);
    }

}

