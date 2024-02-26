// player object
function createPlayer (input_name, input_identifier) {
  const name = input_name;
  const identifier = input_identifier;

  return {name, identifier};
}

// gameboard object
const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const getBoard = () => board;

  const checkwin_helper = (index1, index2, index3) => {
    return board[index1] === board[index2] && board[index2] === board[index3] &&
    (board[index1] !== "" && board[index2] !== "" && board[index3] !== "");
  };

  const checkwin = () => {
    return checkwin_helper(0, 1, 2) || checkwin_helper(3, 4, 5) || 
    checkwin_helper(6, 7, 8) || checkwin_helper(0, 3, 6) || 
    checkwin_helper(1, 4, 7) || checkwin_helper(2, 5, 8) ||
    checkwin_helper(0, 4, 8) || checkwin_helper(2, 4, 6);
  };

  const checkfull = () => {
    for (var i = 0; i < 9; i++) {
      if (board[i] === "") {
        return false;
      }
    }
    return true;
  };

  const makemove = (identifier, index) => {
    if (board[index] !== "") {
      return 3; // player play in spots that are already taken
    }
    board[index] = identifier;
    if (checkwin()) {
      // reset();
      return 0; // game end with one player wins
    } else if (checkfull()){
      // reset();
      return 1; // game end with both player tie
    } else {
      return 2; // game continues
    }
  };

  return {makemove, getBoard, reset};
})();

// gamecontrol object
const gamecontrol = (function () {
  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");
  let current = player1;

  const switchplayer = () => {
    if (current === player1) {
      current = player2;
    } else {
      current = player1;
    }
  };

  const setname1 = (new_name) => {
    player1.name = new_name;
  }

  const setname2 = (new_name) => {
    player2.name = new_name;
  }

  const getcurrentplayer = () => current;

  const taketurn = (index) => {
    let res = gameboard.makemove(current.identifier, index);
    if (res === 2) {
      switchplayer();
      console.log("The next is ", current.name, " turn");
    } else if (res === 1){
      current = player1;
      console.log("Game end with tie, ");
      console.log("The next is ", current.name, " turn");
    } else if (res === 0) {
      console.log("Game end with ", current.name, " wins");
      console.log("The next is ", current.name, " turn");
    } else if (res === 3) {
      console.log("player play in spots that are already taken");
    }
    return res;
  };

  return {taketurn, getcurrentplayer, setname1, setname2};
})();

// displaycontrol object
const displaycontrol = (function () {
  const turn_message = document.getElementById("turn_message");
  const result_message = document.getElementById("result_message");

  const renderboard = () => {
    for (var i = 0; i < 9; i++) {
      const identifier = gameboard.getBoard()[i];
      const grid = document.getElementById(i);
      grid.innerHTML = `<p>${identifier}</p>`;
    }
  };

  const addClickListener = () => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
      grid.addEventListener("click", (e) => {
        const index = e.target.id;
        const res = gamecontrol.taketurn(index);
        if (res === 2) {
          turn_message.textContent = `${gamecontrol.getcurrentplayer().name}'s turn`;
          result_message.textContent = "";
        } else if (res === 1){
          turn_message.textContent = "Game end with a tie";
          result_message.textContent = "Click start to play a new game";
        } else if (res === 0) {
          turn_message.textContent = `Game end with ${gamecontrol.getcurrentplayer().name} wins`;
          result_message.textContent = "Click start to play a new game";
        } else if (res === 3) {
          turn_message.textContent = `${gamecontrol.getcurrentplayer().name}'s turn`;
          result_message.textContent = "Don't play in spots that are already taken";
        }
        renderboard();
      });
    });
  };

  const startdisplay = () => {
    const button = document.getElementById("start_button");
    button.addEventListener("click", () => {
      turn_message.textContent = `${gamecontrol.getcurrentplayer().name} 's turn`;
      result_message.textContent = "";
      gameboard.reset();
      renderboard();
    });
  };

  const setname = () => {
    const name1 = prompt("Type the name of the player 1");
    const name2 = prompt("Type the name of the player 2");
    gamecontrol.setname1(name1);
    gamecontrol.setname2(name2);
  };
    
  return {addClickListener, startdisplay, setname};
})();

displaycontrol.setname();
displaycontrol.startdisplay();
displaycontrol.addClickListener();