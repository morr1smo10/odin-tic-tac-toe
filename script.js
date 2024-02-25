// player object
function createPlayer (input_name, input_identifier) {
  const name = input_name;
  const identifier = input_identifier;

  return {name, identifier}
}

// gameboard object
const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  const checkwin_helper = (index1, index2, index3) => {
    return board[index1] === board[index2] && board[index2] === board[index3] &&
    (board[index1] !== "" && board[index2] !== "" && board[index3] !== "");
  }

  const checkwin = () => {
    return checkwin_helper(0, 1, 2) || checkwin_helper(3, 4, 5) || 
    checkwin_helper(6, 7, 8) || checkwin_helper(0, 3, 6) || 
    checkwin_helper(1, 4, 7) || checkwin_helper(2, 5, 8) ||
    checkwin_helper(0, 4, 8) || checkwin_helper(2, 4, 6);
  }

  const checkfull = () => {
    for (var i = 0; i < 9; i++) {
      if (board[i] === "") {
        return false;
      }
    }
    return true;
  }

  const makemove = (identifier, index) => {
    board[index] = identifier;
    if (checkwin()) {
      reset();
      return 0; // game end with one player wins
    } else if (checkfull()){
      reset();
      return 1; // game end with both player tie
    } else {
      return 2; // game continues
    }
  }

  return {makemove};
})();

