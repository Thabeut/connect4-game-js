import helpFunctions from "./helpFunctions.js";

const boardGame = document.querySelector(
  ".game-container-box-middle-board-game"
);
const columns = document.querySelectorAll(
  ".game-container-box-middle-board-game-column"
);
const gameTurnBox = document.querySelector(".game-container-box-bottom");
const countdownBox = document.querySelector(
  ".game-container-box-bottom-countdown"
);
const cursors = document.querySelectorAll(".game-container-box-middle-cursor");
const bottomColorContainer = document.querySelector(
  ".game-container-bottom-color"
);
const player1Score = document.querySelector(
  ".game-container-box-middle-board-player-1-score"
);
const player2Score = document.querySelector(
  ".game-container-box-middle-board-player-2-score"
);
const playAgainBtn = document.querySelector(
  ".game-container-box-bottom-play-again"
);
const restartBtn = document.querySelector(".restart-btn");

/////////////////////////////

const state = {
  player: "1",
  index: "",
  newGame: true,
};

if (localStorage.getItem("Player1Score")) {
  player1Score.textContent = localStorage.getItem("Player1Score");
}
if (localStorage.getItem("Player2Score")) {
  player2Score.textContent = localStorage.getItem("Player2Score");
}

/////////////////////////////////////////////////
//               Functions
/////////////////////////////////////////////////

const playAgain = function () {
  location.reload();
};
const restartGame = function () {
  localStorage.removeItem("Player1Score");
  localStorage.removeItem("Player2Score");
  location.reload();
};

const playerChange = function () {
  let test = true;
  if (state.player === "1" && test === true) {
    state.player = "2";
    test = false;
  }
  if (state.player === "2" && test === true) {
    state.player = "1";
    test = false;
  }
  const turnTitle = gameTurnBox.children[0];
  const countdown = gameTurnBox.children[1];
  if (state.player === "1") {
    gameTurnBox.style.backgroundColor = "#fd6687";
    turnTitle.textContent = "PLAYER 1'S TURN";
    cursors.forEach((curs) => {
      curs.style.fill = "#fd6687";
    });
  }
  if (state.player === "2") {
    gameTurnBox.style.backgroundColor = "#face67";
    turnTitle.textContent = "PLAYER 2'S TURN";
    turnTitle.style.color = "#333";
    countdown.style.color = "#333";
    cursors.forEach((curs) => {
      curs.style.fill = "#face67";
    });
  }
};
const verifyTrue = function (arr) {
  const arr1 = arr.slice(0, 4);
  const checkArr1 = arr1.every((e) => e === true);
  const arr2 = arr.slice(1, 5);
  const checkArr2 = arr2.every((e) => e === true);
  const arr3 = arr.slice(2, 6);
  const checkArr3 = arr3.every((e) => e === true);
  let finalResult = checkArr1 + checkArr2 + checkArr3;
  return finalResult;
};
const winnerPlayer1 = function (turnTitle, countdown) {
  bottomColorContainer.style.backgroundColor = "#fd6687";
  gameTurnBox.style.backgroundColor = "#fff";
  gameTurnBox.style.height = "18rem";
  gameTurnBox.style.bottom = "-18%";
  turnTitle.textContent = "PLAYER 1";
  countdown.textContent = "WINS";
  const previousScore = Number(player1Score.textContent);
  player1Score.textContent = `${previousScore + 1}`;
  localStorage.setItem("Player1Score", previousScore + 1);

  clearInterval(x);
  playAgainBtn.style.display = "block";
};
const winnerPlayer2 = function (turnTitle, countdown) {
  bottomColorContainer.style.backgroundColor = "#face67";
  gameTurnBox.style.backgroundColor = "#fff";
  gameTurnBox.style.height = "18rem";
  gameTurnBox.style.bottom = "-18%";
  turnTitle.textContent = "PLAYER 2";
  countdown.textContent = "WINS";
  const previousScore = Number(player2Score.textContent);
  player2Score.textContent = `${previousScore + 1}`;
  localStorage.setItem("Player2Score", previousScore + 1);

  clearInterval(x);
  playAgainBtn.style.display = "block";
};
const stopGame = function () {
  state.newGame = false;
};
const getCountdown = function () {
  if (x) {
    clearInterval(x);
  }
  let seconds = 31;
  x = setInterval(function () {
    seconds = seconds - 1;
    countdownBox.textContent = seconds + "s ";
    if (seconds < 0) {
      seconds = 30;
      countdownBox.textContent = seconds + "s ";
      playerChange();
    }
  }, 1000);
};

/////////////////////////////////////////////////
//          Event Listners
/////////////////////////////////////////////////

columns.forEach((col) => {
  col.addEventListener("mouseover", function (e) {
    e.preventDefault();
    const wantedCursor = col.children[0];
    helpFunctions.clearCursors();
    wantedCursor.style.display = "block";
    if (state.player === "1") {
      wantedCursor.style.fill = "#fd6687";
    }
    if (state.player === "2") {
      wantedCursor.style.fill = "#face67";
    }
  });
});
//////////////////

let x;
getCountdown();
//
boardGame.addEventListener("click", function (e) {
  e.preventDefault();
  const column = e.target.closest(
    ".game-container-box-middle-board-game-column"
  );
  if (!column) return;
  const columnNum = column.id.slice(-1);
  const columnArr = [];
  for (let i = 1; i <= 6; i++) {
    columnArr.push(column.children[i].id);
  }
  let index = 0;
  columnArr.forEach((id) => {
    if (!id.includes("player")) {
      index++;
    }
    if (!id.includes("player") && index === columnArr.length) {
      state.index = index;
    }
    if (id.includes("player")) {
      state.index = index;
    }
  });
  let i = state.index;
  if (i != 0 && state.newGame === true) {
    // countdown
    getCountdown();
    //
    let wantedCircle = document.getElementById(`circle-${columnNum}-${i}`);
    wantedCircle.style.borderTop = "0.6rem solid #333";
    if (state.player === "1") {
      wantedCircle.style.backgroundColor = "#fd6687";
      wantedCircle.id = `circle-${columnNum}-${i}-player-1`;
    }
    if (state.player === "2") {
      wantedCircle.style.backgroundColor = "#face67";
      wantedCircle.id = `circle-${columnNum}-${i}-player-2`;
    }

    playerChange(state);

    const finalColumnArr = [];
    for (let i = 1; i <= 6; i++) {
      finalColumnArr.push(column.children[i].id);
    }
    const winArrPlayer1 = [];
    finalColumnArr.forEach((ele) => {
      if (ele.includes("player-1")) {
        winArrPlayer1.push(true);
      } else winArrPlayer1.push(false);
    });
    const winPlayer1 = verifyTrue(winArrPlayer1);
    const winArrPlayer2 = [];
    finalColumnArr.forEach((ele) => {
      if (ele.includes("player-2")) {
        winArrPlayer2.push(true);
      } else winArrPlayer2.push(false);
    });
    const winPlayer2 = verifyTrue(winArrPlayer2);
    const turnTitle = gameTurnBox.children[0];
    const countdown = gameTurnBox.children[1];
    if (winPlayer1 === 1) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2 === 1) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }
  }
});
playAgainBtn.addEventListener("click", function (e) {
  e.preventDefault();
  playAgain();
});
restartBtn.addEventListener("click", function (e) {
  e.preventDefault();
  restartGame();
});
