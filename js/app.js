document.addEventListener('DOMContentLoaded', () => {
    // Hämta alla element från DOM
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');

    const questionTitle = document.getElementById('question-title');
    const questionImage = document.getElementById('question-image');
    const questionAudio = document.getElementById('question-audio');
    const answerContainer = document.getElementById('answer-container');
    const answerSv = document.getElementById('answer-sv');
    const answerLa = document.getElementById('answer-la');

    const showAnswerBtn = document.getElementById('show-answer');
    const nextQuestionBtn = document.getElementById('next-question');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const backToStartBtn = document.getElementById('back-to-start'); // Ny knapp

    // Variabler för quiz-tillstånd
    let currentQuiz = [];
    let currentQuestionIndex = 0;

    // Lyssna efter klick på startskärmens knappar för att välja quiz
    document.querySelectorAll('.quiz-choice').forEach(button => {
        button.addEventListener('click', () => {
            const quizId = button.dataset.quiz;
            currentQuiz = quizData[quizId];
            startQuiz();
        });
    });

    // Startar quizet och visar den första frågan
    function startQuiz() {
        startScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        currentQuestionIndex = 0;
        showQuestion();
    }

    // Visar aktuell fråga och bild/ljud
    function showQuestion() {
        resetQuestionState();
        const question = currentQuiz[currentQuestionIndex];
        questionTitle.innerText = `Fråga ${currentQuestionIndex + 1} av ${currentQuiz.length}`;
        questionImage.src = question.image;

        if (question.audio) {
            questionAudio.src = question.audio;
            questionAudio.style.display = 'block';
            questionAudio.controls = true;
        } else {
            questionAudio.style.display = 'none';
        }

        answerSv.innerText = question.swedishName;
        answerLa.innerText = question.latinName;
    }

    // Återställer frågevyn (döljer svar, etc.)
    function resetQuestionState() {
        answerContainer.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
        showAnswerBtn.classList.remove('hidden');
    }

    // Visar svaret när man klickar på "Visa svar"
    showAnswerBtn.addEventListener('click', () => {
        answerContainer.classList.remove('hidden');
        showAnswerBtn.classList.add('hidden');
        nextQuestionBtn.classList.remove('hidden');
    });

    // Går till nästa fråga eller visar resultat
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    // Visar resultatskärmen
    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }

    // Funktion för att återgå till startskärmen och återställa allt
    function goToHomeScreen() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');

        // Återställ quiz-variabler
        currentQuiz = [];
        currentQuestionIndex = 0;

        // Stoppa eventuellt ljud
        questionAudio.pause();
        questionAudio.currentTime = 0;
    }

    // Lyssna efter klick på "Tillbaka till startsidan"
    backToStartBtn.addEventListener('click', goToHomeScreen);

    // Lyssna efter klick på "Börja om" från resultatskärmen
    restartQuizBtn.addEventListener('click', goToHomeScreen);
});