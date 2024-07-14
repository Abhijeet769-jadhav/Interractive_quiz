const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Trainer Marking Language",
        b: "Hyper Text Marketing Language",
        c: "Hyper Text Markup Language",
        d: "Hyper Text Markup Leveler",
        correct: "c"
    },
    {
        question: "Which language is used for styling web pages?",
        a: "HTML",
        b: "JQuery",
        c: "CSS",
        d: "XML",
        correct: "c"
    },
    {
        question: "Which is not a JavaScript Framework?",
        a: "Python Script",
        b: "JQuery",
        c: "Django",
        d: "NodeJS",
        correct: "c"
    },
    {
        question: "Which is used for Connect To Database?",
        a: "PHP",
        b: "HTML",
        c: "JS",
        d: "All",
        correct: "a"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint",
        correct: "d"
    }
];

const welcomeTab = document.getElementById('welcome-tab');
const quizTab = document.getElementById('quiz-tab');
const resultsTab = document.getElementById('results-tab');
const startQuizBtn = document.getElementById('start-quiz');
const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const results = document.getElementById('results');
const timer = document.getElementById('timer');
const zigzagPattern = document.querySelector('.zigzag-pattern');

let currentQuiz = 0;
let score = 0;
const quizTimeLimit = 30; // Time limit in seconds
let startTime;
let timerInterval;

startQuizBtn.addEventListener('click', () => {
    welcomeTab.style.display = 'none';
    quizTab.style.display = 'block';
    startQuiz();
});

function startQuiz() {
    currentQuiz = 0;
    score = 0;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    loadQuiz();
    addZigZagBackground();
}

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        <ul class="answers">
            <li><input type="radio" name="answer" value="a"> ${currentQuizData.a}</li>
            <li><input type="radio" name="answer" value="b"> ${currentQuizData.b}</li>
            <li><input type="radio" name="answer" value="c"> ${currentQuizData.c}</li>
            <li><input type="radio" name="answer" value="d"> ${currentQuizData.d}</li>
        </ul>
    `;
    quiz.innerHTML = '';
    quiz.appendChild(questionElement);
    addHoverEffects();
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let answer = undefined;
    answers.forEach((ans) => {
        if (ans.checked) {
            answer = ans.value;
        }
    });
    return answer;
}

function addHoverEffects() {
    const answerItems = document.querySelectorAll('.answers li');
    answerItems.forEach((item) => {
        item.addEventListener('click', () => {
            answerItems.forEach((el) => el.classList.remove('selected'));
            item.classList.add('selected');
            item.querySelector('input').checked = true;
        });
    });
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remainingTime = Math.max(quizTimeLimit - elapsedTime, 0);
    timer.innerText = `Time: ${remainingTime}s`;
    if (elapsedTime >= quizTimeLimit) {
        finishQuiz();
    }
}

function addZigZagBackground() {
    zigzagPattern.style.display = 'block'; // Ensure the zigzag pattern is visible
}

function finishQuiz() {
    clearInterval(timerInterval);
    quizTab.style.display = 'none';
    resultsTab.style.display = 'block';
    results.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>You scored ${score} out of ${quizData.length}.</p>
    `;

    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', () => {
        resultsTab.style.display = 'none';
        welcomeTab.style.display = 'block';
    });

    const leaveBtn = document.getElementById('leave');
    leaveBtn.addEventListener('click', () => {
        window.close(); // Close the current window/tab
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            finishQuiz();
        }
    }
});
