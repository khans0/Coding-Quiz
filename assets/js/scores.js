const highscoresList = document.getElementById("highscores");
const highscores = JSON.parse(localStorage.getItem("highscores"));
if (highscores) {
    highscores.forEach((score) => {
        const li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.finalScore}`;
        highscoresList.appendChild(li);
    });
}
