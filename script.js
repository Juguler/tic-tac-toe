let board = Array(9).fill(null)
const Gameboard = (() => {
  let board = Array(9).fill(null)
  
    const updateBoard = (e,index, mark) => {
      e.target.innerText = mark
      board[index] = mark;
    };
  
    const getBoard = () => {
      return board;
    };

    const checkTie = () => {
      return board.every(cell => cell !== null);
    };

    const resetBoard = () => {
      board = ['','','','','','','','',''];
    };

    const checkWin = () => {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for(const condition of winConditions){
        let [a, b, c] = condition

        if(board[a] && (board[a] == board[b] && board[a] == board[c])) {
            return true
        }
      }
      return false
    };
  
    return {
      updateBoard,
      getBoard,
      checkWin,
      checkTie,
      resetBoard
    };
})();

const Player = (name, mark) => {
    return { name, mark };
};
  
const GameController = ((player1, player2) => {
    let currentPlayer = player1;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const makeMove = (e,index) => {
      if(!board[index]){
        Gameboard.updateBoard(e,index, currentPlayer.mark);
        switchPlayer();
      }
    };
    
    const getCurrentPlayer = () => {
      return currentPlayer;
    };

    const getWinnerPlayer = () => {
      return currentPlayer === player1 ? player2 : player1;
    };

    const startWithX = () => {
      currentPlayer = player1;
    }
    
    return {
      makeMove,
      getCurrentPlayer,
      getWinnerPlayer,
      startWithX
    };
})(Player('Player with X', 'X'), Player('Player with O', 'O'));

const DisplayController = (() => {
    const gameboardContainer = document.querySelector('#gameBoard');
    const restartButton = document.querySelector('#restartBtn');
    const resultDisplay = document.querySelector('#resultDisplay');
    let boxes = Array.from(document.getElementsByClassName('box'))
  
    const renderGameboard = () => {
      
      boxes.forEach(box => box.addEventListener('click', (e) => {
        let index = boxes.indexOf(box);
        GameController.makeMove(e,index);
        checkGameOver();
      }));
    };
  
    const checkGameOver = () => {
      if (Gameboard.checkWin()) {
        resultDisplay.textContent = `${GameController.getWinnerPlayer().name} wins!`;
      } else if (Gameboard.checkTie()) {
        resultDisplay.textContent = "It's a tie!";
      }
    };
  
    restartButton.addEventListener('click', () => {
      board.fill(null)
      boxes.forEach( box => {
        box.innerText = ""
      })
      resultDisplay.innerHTML = "Tic Tac Toe"
      GameController.startWithX()
    });
  
    return {
      renderGameboard,
      checkGameOver
    };
})();

DisplayController.renderGameboard();