const introDiv = document.getElementById("intro");
const startButton = document.getElementById("start");
const questionSection = document.getElementById("questions");
const choiceSection = document.getElementById("choices");
const responseSection = document.getElementById("response");
const timerSection = document.getElementById("timer");
const scoreSection = document.getElementById("score");
const highScoreSection = document.getElementById("highscores");

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

highScoreSection.classList.add("hide");

function renderHighScores() {
    const scoreBoard = JSON.parse(localStorage.getItem("scores")) || "";
    console.log(scoreBoard);
    highScoreSection.classList.remove("hide");
    const scoreBoardHeader = document.createElement("h2");
    scoreBoardHeader.textContent = "HighScores:";
    highScoreSection.appendChild(scoreBoardHeader);
}

startButton.addEventListener("click", startQuiz);
choiceSection.addEventListener("click", evaluateAnswer);

let questionIndex = 0;
let timerOn = false;

function startQuiz() {
    if(!timerOn){
        setTime()
    }
    if (timeLeft === 0 || questionIndex >= questions.length) {
        clearInterval(timerInterval);
    } else {
    timerOn = true;
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
}}

const nextQuestionBtn = document.createElement("button");
nextQuestionBtn.addEventListener("click", nextQuestion);

function evaluateAnswer(event) {
    const answer = event.target;
    if (answer.matches("button")) {
        if (answer.textContent == questions[questionIndex].answer) {
            clearInterval(timerInterval);
            questionSection.classList.add("hide");
            choiceSection.classList.add("hide");
            const correctAnswer = document.createElement("h3");
            correctAnswer.textContent = "That's Correct!";
            responseSection.appendChild(correctAnswer);
            console.log("thats correct!")

        } else {
            clearInterval(timerInterval);
            questionSection.classList.add("hide");
            choiceSection.classList.add("hide");
            const incorrectAnswer = document.createElement("h3");
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

function endQuiz() {
    console.log("quiz ending");
    responseSection.textContent = "";
    questionSection.textContent = "";
    choiceSection.textContent = "";
    timerSection.textContent = "";
    setScore();
};

const highScoreArr = [];

function setScore(){
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
    initialSubmit.addEventListener("click", function(event) {
        event.preventDefault();
        const userID = initialInput.value
        const userScore = timeLeft;
        const userData = userID + ": " + userScore;
        highScoreArr.push(userData);
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


//Timer Section
let timerInterval;
let timeLeft = 60;

function setTime() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timerSection.textContent = timeLeft;

        if (timeLeft === 0 || questionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }

    }, 1000);
}