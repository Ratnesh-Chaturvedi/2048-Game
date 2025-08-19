var board;
var rows = 4;
var cols = 4;
var score = 0;

let finalScore = document.querySelector("#finalScore");
let overlay = document.querySelector("#overlay");
let restartBtn = document.querySelector("#restart");
window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = document.createElement("div");
      // every cell has id like 1-1
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.querySelector(".gameBoard").append(tile);
    }
  }
  set2();
  set2();
}

// Game over condition
function gameOver(board) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] == 0) return false;
      if (r < rows - 1 && board[r][c] == board[r + 1][c]) return false;
      if (c < cols - 1 && board[r][c] == board[r][c + 1]) return false;
    }
  }
  return true;
}

function restartGame() {
  setGame();
}
function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}
// function to check that board is full or not
function hasEmptyTile() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] == 0) return true;
    }
  }
  return false;
}

// generate a number when we press any key when
function set2() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    set2();
  } else if (e.code == "ArrowRight") {
    slideRight();
    set2();
  } else if (e.code == "ArrowUp") {
    slideUp();
    set2();
  } else if (e.code == "ArrowDown") {
    slideDown();
    set2();
  }
  document.querySelector("#score").innerText = score;
  if (gameOver(board)) {
    finalScore.textContent = score;
    overlay.style.display = "flex";
    restartBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      score = 0;
      location.reload(); 
    });
  }
});

function filterZero(row) {
  return row.filter((n) => n != 0);
}

function slide(row) {
  // [0,2,2,0]=>[0,0,2,2]
  row = filterZero(row); // [2,2]
  // slide
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] = row[i] * 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  // because if the  [2,2,0,2]=>[4,0,0,2] => [4,2]
  row = filterZero(row);
  while (row.length < cols) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (c = 0; c < cols; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();

    board[r] = row;
    for (c = 0; c < cols; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < cols; c++) {
    // like trannspose
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c]=row[0];
    // board[1][c]=row[1];
    // board[2][c]=row[2];
    // board[3][c]=row[3];
    for (r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < cols; c++) {
    // like trannspose
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c]=row[0];
    // board[1][c]=row[1];
    // board[2][c]=row[2];
    // board[3][c]=row[3];
    for (r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
