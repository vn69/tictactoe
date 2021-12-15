const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const itemList = $$(".item");
const board = $(".board");
const resetBtn = $(".btn-reset");
const winPlayer = $(".win-player");

const app = {
  xTurn: true,
  isWin: false,

  handlEven: function () {
    // click to item
    board.onclick = (e) => {
      const itemClick = e.target;
      if (e.target === board) return;
      if (this.isWin) return;
      if (e.target.classList.contains("active")) return;
      if (this.xTurn) e.target.classList.add("active", "active-x");
      else e.target.classList.add("active", "active-o");

      // remove hover class
      e.target.classList.remove("hover", "hover-x", "hover-o");

      this.checkWin();

      this.xTurn = !this.xTurn;
    };

    // click to reset
    resetBtn.onclick = () => {
      itemList.forEach((element) => {
        element.classList.remove("active", "active-x", "active-o");
      });
      this.isWin = false;
      this.xTurn = true;
      winPlayer.classList.remove("win-player-show");
    };

    // hover to item
    itemList.forEach((item) => {
      item.onmouseover = () => {
        let classHover = "hover-o";
        if (item.classList.contains("active")) return;
        if (this.isWin) return;

        if (this.xTurn) classHover = "hover-x";
        item.classList.add("hover", classHover);
      };
      item.onmouseout = () => {
        item.classList.remove("hover", "hover-x", "hover-o");
      };
    });
  },

  checkWin: function () {
    const itemCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let classCheck = "active-x";
    if (!this.xTurn) classCheck = "active-o";

    itemList.forEach((element, i) => {
      if (element.classList.contains(classCheck)) itemCheck[i] = 1;
    });
    if (
      itemCheck[0] + itemCheck[1] + itemCheck[2] == 3 ||
      itemCheck[3] + itemCheck[4] + itemCheck[5] == 3 ||
      itemCheck[6] + itemCheck[7] + itemCheck[8] == 3 ||
      itemCheck[0] + itemCheck[3] + itemCheck[6] == 3 ||
      itemCheck[1] + itemCheck[4] + itemCheck[7] == 3 ||
      itemCheck[2] + itemCheck[5] + itemCheck[8] == 3 ||
      itemCheck[0] + itemCheck[4] + itemCheck[8] == 3 ||
      itemCheck[2] + itemCheck[4] + itemCheck[6] == 3
    ) {
      winPlayer.innerHTML = this.xTurn ? "X win" : "O win";
      this.gameOver();
    } else if (itemCheck.reduce((a, b) => a + b) == 5) {
      winPlayer.innerHTML = "Draw :)";
      this.gameOver();
    }
  },

  gameOver: function () {
    this.isWin = true;
    winPlayer.classList.add("win-player-show");
  },

  start: function () {
    this.handlEven();
  },
};
app.start();
