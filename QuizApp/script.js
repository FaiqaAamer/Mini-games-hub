let quizContainer = document.getElementById("quiz")
let scoreDisplay = document.getElementById("score")
let nextBtn = document.getElementById("next")

let currentQuestion = 0
let score = 0

const questions = [
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["let", "var", "const", "static"],
    answer: "const"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Dynamic Output Module",
      "Document Oriented Mapping"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    answer: "Character"
  },
  {
    question: "In CSS, which property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  }
];

function loadQuestions(){
    quizContainer.innerHTML = ""
    const q = questions[currentQuestion]

    const questionEl = document.createElement("div")
    questionEl.classList.add("question")
    questionEl.textContent = q.question
    quizContainer.appendChild(questionEl)

    q.options.forEach(option => {
        const btn = document.createElement("button")
        btn.classList.add("option")
        btn.textContent = option
        btn.onclick = () => {checkAnswer(option)}
        quizContainer.appendChild(btn)
    })
}

function checkAnswer(selected){
    if(selected === questions[currentQuestion].answer){
        score++
    }
    
    currentQuestion++

    if(currentQuestion < questions.length){
        loadQuestions()
    }else{
        quizContainer.innerHTML = `
        <div class="result">
            <h2>🎉 Quiz Finished!</h2>
            <p>Your Score: <strong>${score}/${questions.length}</strong></p>
            <p>${score === questions.length 
                ? "Excellent! You got all correct!" 
                : score >= questions.length / 2 
                ? "Good job! Keep practicing!" 
                : "Better luck next time!"}</p>
        </div>
        `;
    }
}

loadQuestions()