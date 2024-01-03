const Gameboard = (() => {
    let board = ['','','','','','','','',''];
  
    const updateBoard = (index, mark) => {
      board[index] = mark;
    };
  
    const getBoard = () => {
      return board;
    };
  
    return {
      updateBoard,
      getBoard
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
  
    return {
      makeMove
    };
})(Player('Player with X', 'X'), Player('Player with O', 'O'));

const DisplayController = (() => {
    const gameboardContainer = document.querySelector('#gameBoard');
    const restartButton = document.querySelector('#restart-button');
    const resultDisplay = document.querySelector('#result-display');
  
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
        resultDisplay.textContent = `${GameController.getCurrentPlayer().name} wins!`;
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