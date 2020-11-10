class WebUIHandler {

    gameMessage;
    newGameButton;
    boardElement;
 
    constructor() {
        this.gameMessage = document.getElementById('game-message');
        this.newGameButton = document.getElementById('new-game-button');
        this.boardElement = document.getElementById('board');

        this.initializeBoard();

        this.handlePlayerMove();
        this.handleNewGameClick();
    }

    initializeBoard(boardSize) {
        for(let i=0; i<boardSize; i++) {
            for(let j=0; j<boardSize; j++) {
                let cell = this.boardElement.appendChild(document.createElement('div'));
                cell.setAttribute('class', 'cell');
                cell.setAttribute('id', `${i}_${j}`);
            }
        }

        this.boardElement.style.gridTemplate = `repeat(${this.boardSize}, 1fr)/repeat(${this.boardSize}, 1fr)`;
    }

    addVisualCell(elementId) {
        if(this.isXTurn) {
            document.getElementById(elementId).innerHTML = 'X';
        } else {
            document.getElementById(elementId).innerHTML = 'O';
        }
    }

    handlePlayerMove() {
        this.boardElement.addEventListener('click', (e) => {
            let cellId = e.target.getAttribute('id');
            let position = cellId.split('_');

            this.addVisualCell(cellId);
            this.makeMove(position[0], position[1]);
        });
    }

    handleNewGameClick() {
        this.newGameButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    resetVisualBoard() {
        this.boardElement.childNodes.forEach((node) => node.innerHTML = '');

    }

    resetGameText() {
        this.gameMessage.innerHTML = '';
    }
}