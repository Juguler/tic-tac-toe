const Gameboard = (() => {
    let board = ['','','','','','','','',''];
  
    const updateBoard = (index, mark) => {
      board[index] = mark;
    };
  
    const getBoard = () => {
      return board;
    };

    const checkTie = () => {
      return board.every(cell => cell !== '');
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
      return winConditions.some(condition => 
        board[condition[0]] !== '' &&
        board[condition[0]] === board[condition[1]] &&
        board[condition[0]] === board[condition[2]]
      );
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
  
    const makeMove = (index) => {
      Gameboard.updateBoard(index, currentPlayer.mark);
      switchPlayer();
    };
    
    const getCurrentPlayer = () => {
      return currentPlayer;
    };

    const getWinnerPlayer = () => {
      return currentPlayer === player1 ? player2 : player1;
    };
    
    return {
      makeMove,
      getCurrentPlayer,
      getWinnerPlayer
    };
})(Player('Player with X', 'X'), Player('Player with O', 'O'));

const DisplayController = (() => {
    const gameboardContainer = document.querySelector('#gameBoard');
    const restartButton = document.querySelector('#restartBtn');
    const resultDisplay = document.querySelector('#resultDisplay');
  
    const renderGameboard = () => {
      gameboardContainer.innerHTML = '';
      const board = Gameboard.getBoard();
      board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => {
          GameController.makeMove(index);
          renderGameboard();
          checkGameOver();
        });
        gameboardContainer.appendChild(cellElement);
      });
    };
  
    const checkGameOver = () => {
      if (Gameboard.checkWin()) {
        resultDisplay.textContent = `${GameController.getWinnerPlayer().name} wins!`;
      } else if (Gameboard.checkTie()) {
        resultDisplay.textContent = "It's a tie!";
      }
    };
  
    restartButton.addEventListener('click', () => {
      Gameboard.resetBoard();
      renderGameboard();
      resultDisplay.textContent = '';
    });
  
    return {
      renderGameboard
    };
})();

DisplayController.renderGameboard();