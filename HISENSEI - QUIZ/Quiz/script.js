const questions = [
    {
        question: "Manakah Berikut Ini Tergolong Makanan Manis?" ,
        answers: [
            { text: "Gula", correct: true},
            { text: "Jeruk", correct: false},
            { text: "Obat", correct: false},
            { text: "Air", correct: false},
        ]
    },
     {
        question: "Manakah Berikut Ini Tergolong Salah?" ,
            answers: [
            { text: "Mendoakan", correct: false},
            { text: "Berobat", correct: false},
            { text: "Narkoba", correct: true},
            { text: "Main Game", correct: false},
        ]
    },
    {
        question: "Manakah Berikut Ini Tergolong Jorok?" ,
            answers: [
            { text: "mandi", correct: true},
            { text: "makan", correct: false},
            { text: "tidur", correct: false},
            { text: "ngocok", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skor kamu adalah ${score} dari ${questions.length}!`
    nextButton.innerHTML = "Coba Lagi";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();