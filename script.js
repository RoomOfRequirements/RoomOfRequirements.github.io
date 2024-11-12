let currentQuestionIndex = 0;
let scores = { score_G: 0, score_S: 0, score_H: 0, score_R: 0 };

function displayQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Clear the previous question

    const questionData = data[currentQuestionIndex];
    const questionText = document.createElement("h2");
    questionText.textContent = questionData.Question;
    quizContainer.appendChild(questionText);

    questionData.Answers.forEach(answer => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.text;
        answerButton.classList.add("answer-button");
        answerButton.onclick = () => selectAnswer(answer);
        quizContainer.appendChild(answerButton);
    });
}

function selectAnswer(answer) {
    scores.score_G += answer.score_G;
    scores.score_S += answer.score_S;
    scores.score_H += answer.score_H;
    scores.score_R += answer.score_R;

    currentQuestionIndex++;
    if (currentQuestionIndex < data.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hidden");

    const houseScores = [
        { house: "Gryffindor", score: scores.score_G },
        { house: "Slytherin", score: scores.score_S },
        { house: "Hufflepuff", score: scores.score_H },
        { house: "Ravenclaw", score: scores.score_R }
    ];

    houseScores.sort((a, b) => b.score - a.score);
    resultContainer.textContent = `🎉 You belong to ${houseScores[0].house}! 🎉`;
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
}

document.getElementById("next-btn").onclick = () => {
    if (currentQuestionIndex < data.length) {
        displayQuestion();
    } else {
        showResult();
    }
};

// Function to play audio after the first user interaction
function playAudioOnInteraction() {
    const audio = document.getElementById("background-audio");
    audio.play();
    // Remove the event listener to prevent multiple plays
    document.removeEventListener("click", playAudioOnInteraction);
    document.removeEventListener("keydown", playAudioOnInteraction);
}
displayQuestion();


// Add event listeners for first interaction (click or key press)
document.addEventListener("click", playAudioOnInteraction);
document.addEventListener("keydown", playAudioOnInteraction);

const audio = document.querySelector("audio");
audio.volume = 0.05;
