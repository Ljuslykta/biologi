document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');

    const questionTitle = document.getElementById('question-title');
    const questionImage = document.getElementById('question-image');
    const questionAudio = document.getElementById('question-audio');
    const answerContainer = document.getElementById('answer-container');
    const answerSv = document.getElementById('answer-sv');
    const answerLa = document.getElementById('answer-la');
    const backToStartBtn = document.getElementById('back-to-start');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const showAnswerBtn = document.getElementById('show-answer');
    const nextQuestionBtn = document.getElementById('next-question');
    const restartQuizBtn = document.getElementById('restart-quiz');

    let currentQuiz = [];
    let currentQuestionIndex = 0;

    document.querySelectorAll('.quiz-choice').forEach(button => {
        button.addEventListener('click', () => {
            const quizId = button.dataset.quiz;
            currentQuiz = quizData[quizId];
            startQuiz();
        });
    });

    function startQuiz() {
        startScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        resetQuestionState();
        const question = currentQuiz[currentQuestionIndex];
        questionTitle.innerText = `Fråga ${currentQuestionIndex + 1} av ${currentQuiz.length}`;
        questionImage.src = question.image;

        if (question.audio) {
            questionAudio.src = question.audio;
            // Autoplay kan blockeras av webbläsare, så det är bättre att lägga till en uppspelningsknapp. [1, 3, 4]
            // För detta exempel antar vi att användaren klickar på den inbyggda kontroller.
            questionAudio.style.display = 'block';
            questionAudio.controls = true;
        } else {
            questionAudio.style.display = 'none';
        }

        answerSv.innerText = question.swedishName;
        answerLa.innerText = question.latinName;
    }

    function resetQuestionState() {
        answerContainer.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
        showAnswerBtn.classList.remove('hidden');
    }

    showAnswerBtn.addEventListener('click', () => {
        answerContainer.classList.remove('hidden');
        showAnswerBtn.classList.add('hidden');
        nextQuestionBtn.classList.remove('hidden');
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }

    restartQuizBtn.addEventListener('click', () => {
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
function goToHomeScreen() {
        // Göm fråge- och resultatskärmarna
        questionScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');

        // Visa startskärmen
        startScreen.classList.remove('hidden');

        // Återställ quiz-variabler (mycket viktigt!)
        currentQuiz = [];
        currentQuestionIndex = 0;

        // Stoppa eventuellt ljud
        questionAudio.pause();
        questionAudio.currentTime = 0;
    }

    // EVENT-LYSSNARE FÖR DEN NYA KNAPPEN
    backToStartBtn.addEventListener('click', goToHomeScreen);

    // UPPDATERAD EVENT-LYSSNARE FÖR "BÖRJA OM"-KNAPPEN SÅ ATT DEN OCKSÅ ANVÄNDER DEN NYA FUNKTIONEN
    restartQuizBtn.addEventListener('click', goToHomeScreen);
}



    );
});