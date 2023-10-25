const introDiv = document.getElementById("intro");
const startButton = document.getElementById("start");
const questionSection = document.getElementById("questions");
const responseSection = document.getElementById("response");

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

startButton.addEventListener("click", startQuiz);
questionSection.addEventListener("click", evaluateAnswer);

function startQuiz(){
    for(let i = 0; i < questions.length; i++) {
        //create elements
        //1 h2
        //4 buttons
        //buttons have class = answers
        //add event listener to questionSection
        //if (event.target.matches(.answers){})
console.log(questions[i].question);
console.log(questions[i].a);
console.log(questions[i].b);
console.log(questions[i].c);
console.log(questions[i].d);
    }
}

function evaluateAnswer(event){
    const answer = event.target;
    console.log(answer)
    // if(answer.value.matches()) its sibling...find a way to target the answer sibling
}