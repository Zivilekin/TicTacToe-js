class Game {
    board = [];
    isXTurn = true;
    boardSize = 5;

    gameMessage;
    newGameButton;
    boardElement;

    constructor() {
        this.gameMessage = document.getElementById('game-message');
        this.newGameButton = document.getElementById('new-game-button');
        this.boardElement = document.getElementById('board');

        this.resetBoard();
        this.createVisualBoard();

        this.handlePlayerMove();
        this.handleNewGameClick();
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

    createVisualBoard() {
        for(let i=0; i<this.boardSize; i++) {
            for(let j=0; j<this.boardSize; j++) {
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

    makeMove(x,y) {
        if(this.isXTurn) {
            this.board[x][y] = 'x';
        } else {
            this.board[x][y] = 'o';
        }
        this.checkIfSomeoneWon();
        this.isXTurn = !this.isXTurn;
        this.printBoard();
    }

    printBoard() {
        for(let i=0; i<this.boardSize; i++){
            console.log(this.board[i]);
        }
    }

    checkIfSomeoneWon() {
        for(let i=0; i<this.boardSize; i++) {
            if (this.checkHorizontal(i) || this.checkVertical(i)){
                this.isXTurn ? this.gameMessage.innerHTML = 'X is winner!' : this.gameMessage.innerHTML = 'O is winner!';
            }
        }
    }

    checkHorizontal(lineIndex) {
        let boolVal = this.board[lineIndex][0];

        for(let i=1; i<this.boardSize; i++) {
            boolVal &&= this.board[lineIndex][0] === this.board[lineIndex][i];
        }

        return boolVal;

        // return this.board[lineIndex][0] && 
        //     this.board[lineIndex][0] === this.board[lineIndex][1] && this.board[lineIndex][0] === this.board[lineIndex][2];
    }

    checkVertical(columnIndex) {
        let boolVal = this.board[0][columnIndex];

        for(let i=1; i<this.boardSize; i++) {
            boolVal &&= this.board[0][columnIndex] === this.board[i][columnIndex];
        }

        return boolVal;

        // return this.board[0][columnIndex] && 
        //     this.board[0][columnIndex] === this.board[1][columnIndex] && this.board[0][columnIndex] === this.board[2][columnIndex];
    }

    resetBoard() {
        for(let i=0; i<this.boardSize; i++) {
            this.board[i] = [];
            for(let j=0; j<this.boardSize; j++) {
                this.board[i][j] = '';
            }
        }
    }

    resetVisualBoard() {
        this.boardElement.childNodes.forEach((node) => node.innerHTML = '');

    }

    resetGameText() {
        this.gameMessage.innerHTML = '';
    }

    resetGame() {
        this.resetBoard();
        this.resetVisualBoard();
        this.resetGameText();
    }

}

let game = new Game();
