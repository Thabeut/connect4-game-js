const cursors = document.querySelectorAll(".game-container-box-middle-cursor");
const countdownBox = document.querySelector(
  ".game-container-box-bottom-countdown"
);
class HelpFunctions {
  clearCursors() {
    cursors.forEach((curs) => {
      curs.style.display = "none";
    });
  }
}
export default new HelpFunctions();
