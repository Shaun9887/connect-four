/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let tempArr = [];
  for (let y = 0; y < HEIGHT; y++){
    for (let x = 0; x < WIDTH; x++){
      tempArr.push(null);
    }
    board.push(tempArr);
    tempArr = [];
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code
  //create top row that will be clicked on by players to drop piece 
  const top = document.createElement("tr");
  //gives new top row an id of column-top
  top.setAttribute("id", "column-top");
  //add event listener of handleclick function to top row since it is to be clicked by players
  top.addEventListener("click", handleClick); 


  //this loop creates the amount of horizontal cells (td) in top row;
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    //giving the cells in the top row an id of x
    headCell.setAttribute("id", x); 
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //loop to create all other rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //looping to create cells in each row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //set id to make each cell unique
      cell.setAttribute("id", `${y}-${x}`); 
      //append created cell to row
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //loop to check if each row and column is null
  for (let y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]) {
      //return the empty top row to put piece in selected column
      return y;
    }
  }
  //if the column is filled return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //create piece as div
  const piece = document.createElement('div');
  // add the "piece" class to the new div
  piece.classList.add('piece');
  // add the "p1" or "p2" class to the div
  piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);

  const pieceLoc = document.getElementById(`${y}-${x}`);
  pieceLoc.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  window.alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('It\'s a tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //four directions with possible ways to win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //check if player wins in any of 4 directions
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
