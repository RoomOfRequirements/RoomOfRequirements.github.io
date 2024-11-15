let currentQuestionIndex = 0;
let scores = { score_G: 0, score_S: 0, score_H: 0, score_R: 0 };

function displayQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const questionData = data[currentQuestionIndex];
    const questionText = document.createElement("h2");
    questionText.textContent = currentQuestionIndex+1 + "- " +questionData.Question;
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
    resultContainer.textContent = `You belong to ${houseScores[0].house}! ${emoji(houseScores[0].house)}`;
    document.body.classList.add(houseScores[0].house.toLowerCase());
    document.getElementById("header").textContent = `Congratulations`;
    quiz_container.classList.remove("quiz-container-neutral");
    quiz_container.classList.add(`quiz-container-${houseScores[0].house}`);
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById(`${houseScores[0].house}_banner_flag`).classList.remove("hidden");
    document.getElementById(`${houseScores[0].house}_gif`).classList.remove("hidden");
    playHouseAudio(houseScores[0].house);
}

setInterval(() => {
    if (currentQuestionIndex === 0) {
        document.getElementById("next-btn").classList.add("unclickable");
    } else {
        document.getElementById("next-btn").classList.remove("unclickable");
    }
}, 100); 

function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function playHouseAudio(house) {
    const audio = document.getElementById("house-audio");
    audio.src = `assets/audio/${house}.mp3`;
    audio.play();
}

function emoji(house){
    if (house === "Gryffindor") {
        return "🦁";
    } else if (house === "Slytherin") {
        return "🐍";
    } else if (house === "Hufflepuff") {
        return "🦡";
    } else if (house === "Ravenclaw") {
        return "🦅";
    }
}

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
audio.volume = 0.03;

const house_audio = document.getElementById("house-audio");
house_audio.volume = 0.5;
