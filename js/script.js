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

const menuBtn = document.querySelector(".menu-btn");
const overlay = document.querySelector(".overlay");
const continueGame = document.querySelector(".continue-game");
const quitGameBtn = document.querySelector(".quit-game");

const restartGameMenuBtn = document.querySelector(".restart-game");

const menuWindow = document.querySelector(".game-container-menu-window-box");
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
const quitGame = function () {
  localStorage.removeItem("Player1Score");
  localStorage.removeItem("Player2Score");
  window.location.href = "https://www.google.com/";
};
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
  let l = arr.length;
  if (l === 4) {
    const arr1 = arr.slice(0, 4);
    const checkArr1 = arr1.every((e) => e === true);
    let finalResult = checkArr1;
    return finalResult;
  } else if (l === 5) {
    const arr1 = arr.slice(0, 4);
    const checkArr1 = arr1.every((e) => e === true);
    const arr2 = arr.slice(1, 5);
    const checkArr2 = arr2.every((e) => e === true);
    let finalResult = checkArr1 || checkArr2;
    return finalResult;
  } else if (l === 6) {
    const arr1 = arr.slice(0, 4);
    const checkArr1 = arr1.every((e) => e === true);
    const arr2 = arr.slice(1, 5);
    const checkArr2 = arr2.every((e) => e === true);
    const arr3 = arr.slice(2, 6);
    const checkArr3 = arr3.every((e) => e === true);
    let finalResult = checkArr1 || checkArr2 || checkArr3;
    return finalResult;
  } else if (l === 7) {
    const arr1 = arr.slice(0, 4);
    const checkArr1 = arr1.every((e) => e === true);
    const arr2 = arr.slice(1, 5);
    const checkArr2 = arr2.every((e) => e === true);
    const arr3 = arr.slice(2, 6);
    const checkArr3 = arr3.every((e) => e === true);
    const arr4 = arr.slice(3, 7);
    const checkArr4 = arr4.every((e) => e === true);
    let finalResult = checkArr1 || checkArr2 || checkArr3 || checkArr4;
    return finalResult;
  } else {
    return 0;
  }
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
const getCountdown = function (seconds = 31) {
  if (x) {
    clearInterval(x);
  }

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
    wantedCircle.style.animation = "MoveUpDown 0.1s linear";

    if (state.player === "1") {
      wantedCircle.style.backgroundColor = "#fd6687";
      wantedCircle.id = `circle-${columnNum}-${i}-player-1`;
    }
    if (state.player === "2") {
      wantedCircle.style.backgroundColor = "#face67";
      wantedCircle.id = `circle-${columnNum}-${i}-player-2`;
    }

    playerChange(state);

    ////////////////////////
    //   Diagonal1 Win
    ////////////////////////
    let finalDiagonalArr1 = [];
    const circleNum = +state.index;
    const columnNumtest = +columnNum;

    for (let i = columnNumtest; i > 0; i--) {
      if (circleNum - (i - columnNumtest) < 7) {
        let wantedCircleD = document.querySelector(
          `.game-container-box-middle-board-game-column-${i}-${
            circleNum - (i - columnNumtest)
          }`
        );
        finalDiagonalArr1.push(wantedCircleD.id);
      }
    }
    ////
    const winArrPlayer1D = [];
    finalDiagonalArr1.forEach((ele) => {
      if (ele.includes("player-1")) {
        winArrPlayer1D.push(true);
      } else winArrPlayer1D.push(false);
    });
    const winPlayer1D = verifyTrue(winArrPlayer1D);

    const winArrPlayer2D = [];
    finalDiagonalArr1.forEach((ele) => {
      if (ele.includes("player-2")) {
        winArrPlayer2D.push(true);
      } else winArrPlayer2D.push(false);
    });
    const winPlayer2D = verifyTrue(winArrPlayer2D);

    ////////////////////////
    //   Diagonal2 Win
    ////////////////////////

    let finalDiagonalArr2 = [];

    finalDiagonalArr2.push(
      document.querySelector(
        `.game-container-box-middle-board-game-column-${columnNum}-${state.index}`
      ).id
    );

    for (let i = 1; i <= 7 - columnNumtest; i++) {
      if (circleNum - i > 0) {
        let wantedCircleD_2 = document.querySelector(
          `.game-container-box-middle-board-game-column-${columnNumtest + i}-${
            circleNum - i
          }`
        );
        finalDiagonalArr2.push(wantedCircleD_2.id);
      }
    }
    const winArrPlayer1D_2 = [];
    finalDiagonalArr2.forEach((ele) => {
      if (ele.includes("player-1")) {
        winArrPlayer1D_2.push(true);
      } else winArrPlayer1D_2.push(false);
    });
    const winPlayer1D_2 = verifyTrue(winArrPlayer1D_2);

    const winArrPlayer2D_2 = [];
    finalDiagonalArr2.forEach((ele) => {
      if (ele.includes("player-2")) {
        winArrPlayer2D_2.push(true);
      } else winArrPlayer2D_2.push(false);
    });
    const winPlayer2D_2 = verifyTrue(winArrPlayer2D_2);

    ////////////////////////
    //   Diagonal3 Win
    ////////////////////////
    let finalDiagonalArr3 = [];
    for (let i = 0; i < columnNumtest; i++) {
      if (circleNum - i > 0) {
        let wantedCircleD_3 = document.querySelector(
          `.game-container-box-middle-board-game-column-${columnNumtest - i}-${
            circleNum - i
          }`
        );
        finalDiagonalArr3.push(wantedCircleD_3.id);
      }
    }
    const winArrPlayer1D_3 = [];
    finalDiagonalArr3.forEach((ele) => {
      if (ele.includes("player-1")) {
        winArrPlayer1D_3.push(true);
      } else winArrPlayer1D_3.push(false);
    });
    const winPlayer1D_3 = verifyTrue(winArrPlayer1D_3);

    const winArrPlayer2D_3 = [];
    finalDiagonalArr3.forEach((ele) => {
      if (ele.includes("player-2")) {
        winArrPlayer2D_3.push(true);
      } else winArrPlayer2D_3.push(false);
    });
    const winPlayer2D_3 = verifyTrue(winArrPlayer2D_3);

    ////////////////////////
    //   Diagonal4 Win
    ////////////////////////
    let finalDiagonalArr4 = [];
    for (let i = columnNumtest; i <= 7; i++) {
      if (
        circleNum + (i - columnNumtest) > 0 &&
        circleNum + (i - columnNumtest) < 7
      ) {
        let wantedCircleD_4 = document.querySelector(
          `.game-container-box-middle-board-game-column-${i}-${
            circleNum + (i - columnNumtest)
          }`
        );
        finalDiagonalArr4.push(wantedCircleD_4.id);
      }
    }
    const winArrPlayer1D_4 = [];
    finalDiagonalArr4.forEach((ele) => {
      if (ele.includes("player-1")) {
        winArrPlayer1D_4.push(true);
      } else winArrPlayer1D_4.push(false);
    });
    const winPlayer1D_4 = verifyTrue(winArrPlayer1D_4);

    const winArrPlayer2D_4 = [];
    finalDiagonalArr4.forEach((ele) => {
      if (ele.includes("player-2")) {
        winArrPlayer2D_4.push(true);
      } else winArrPlayer2D_4.push(false);
    });
    const winPlayer2D_4 = verifyTrue(winArrPlayer2D_4);

    ////////////////////////
    //   Horizontal Win
    ////////////////////////
    let finalArrowArr = [];

    columns.forEach((col) => {
      finalArrowArr.push(col.children[state.index].id);
    });

    const winArrPlayer1H = [];
    finalArrowArr.forEach((ele) => {
      if (ele.includes("player-1")) {
        winArrPlayer1H.push(true);
      } else winArrPlayer1H.push(false);
    });
    const winPlayer1H = verifyTrue(winArrPlayer1H);

    const winArrPlayer2H = [];
    finalArrowArr.forEach((ele) => {
      if (ele.includes("player-2")) {
        winArrPlayer2H.push(true);
      } else winArrPlayer2H.push(false);
    });
    const winPlayer2H = verifyTrue(winArrPlayer2H);

    ////////////////////////
    //   Vertical Win
    ////////////////////////
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

    ////////////////////////
    //   WIN
    ////////////////////////

    if (winPlayer1 === true) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2 === true) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer1H === true) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2H === true) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer1D === true) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2D === true) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer1D_2 === true) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2D_2 === true) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer1D_3 === true) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2D_3 === true) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer1D_4 === true) {
      winnerPlayer1(turnTitle, countdown);
      stopGame();
    }
    if (winPlayer2D_4 === true) {
      winnerPlayer2(turnTitle, countdown);
      stopGame();
    }

    // DRAW

    let drawCheck = [];
    columns.forEach((col) => {
      for (let i = 1; i < 7; i++) {
        drawCheck.push(col.children[i].id);
      }
    });
    let checkD = false;
    drawCheck.forEach((ele) => {
      if (ele.includes("player")) {
        checkD += ele.includes("player");
      }
    });
    if (checkD === 42) {
      clearInterval(x);
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
restartGameMenuBtn.addEventListener("click", function (e) {
  e.preventDefault();
  restartGame();
});
menuBtn.addEventListener("click", function (e) {
  e.preventDefault();
  menuWindow.classList.remove("hidden");
  clearInterval(x);
});
overlay.addEventListener("click", function (e) {
  e.preventDefault();
  menuWindow.classList.add("hidden");
  let seconds = countdownBox.textContent;
  getCountdown(parseInt(seconds));
});
continueGame.addEventListener("click", function (e) {
  e.preventDefault();
  menuWindow.classList.add("hidden");
  let seconds = countdownBox.textContent;
  getCountdown(parseInt(seconds));
});
quitGameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  quitGame();
});
