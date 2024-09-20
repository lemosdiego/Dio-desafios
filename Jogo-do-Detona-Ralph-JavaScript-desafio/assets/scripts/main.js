const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timeId: null,
    countDownTimerId: setInterval(countDown, 1000),
    gameTime: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
};
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timeId);

    alert(`Game over! sua pontuação: ${state.values.result}`);
  }
}
function plySound() {
  let audio = new Audio("./assets/audio/hit.m4a");
  audio.volume = 0.2;
  audio.play();
}
function drawSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  let drawNumber = Math.floor(Math.random() * 9);
  let drawSquare = state.view.squares[drawNumber];
  drawSquare.classList.add("enemy");
  state.values.hitPosition = drawSquare.id;
}
function moveEnemy() {
  state.values.timeId = setInterval(drawSquare, state.values.gameTime);
}
function addLiestnerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        plySound();
      }
    });
  });
}

function main() {
  moveEnemy();
  addLiestnerHitBox();
}
main();
