class Game {
    board = [];
    isXTurn = true;

    gameMessage;
    newGameButton;

    constructor() {
        this.gameMessage = document.getElementById('game-message');
        this.newGameButton = document.getElementById('new-game-button');

        this.resetBoard();
        this.createVisualBoard();

        this.handlePlayerMove();
        this.handleNewGameClick();
    }

    handlePlayerMove() {
        document.querySelector('#board').addEventListener('click', (e) => {
            let cellId = e.target.getAttribute('id');
            let position = cellId.split('_');

            this.addVisualCell(cellId);
            this.makeMove(position[0], position[1]);
        });
    }

    handleNewGameClick() {
        this.newGameButton.addEventListener('click', () => {
            this.resetGame();
        })
    }

    createVisualBoard() {
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                let cell = document.getElementById('board').appendChild(document.createElement('div'));
                cell.setAttribute('class', 'cell');
                cell.setAttribute('id', `${i}_${j}`);
            }
        }
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
        for(let i=0; i<3; i++){
            console.log(this.board[i]);
        }
    }

    checkIfSomeoneWon() {
        for(let i=0; i<3; i++) {
            if (this.checkHorizontal(i) || this.checkVertical(i)){
                this.isXTurn ? this.gameMessage.innerHTML = 'X is winner!' : this.gameMessage.innerHTML = 'O is winner!';
            }
        }
    }

    checkHorizontal(lineIndex) {
        return this.board[lineIndex][0] && 
            this.board[lineIndex][0] === this.board[lineIndex][1] && this.board[lineIndex][0] === this.board[lineIndex][2];
    }

    checkVertical(columnIndex) {
        return this.board[0][columnIndex] && 
            this.board[0][columnIndex] === this.board[1][columnIndex] && this.board[0][columnIndex] === this.board[2][columnIndex];
    }

    resetBoard() {
        for(let i=0; i<3; i++) {
            this.board[i] = ['','',''];
        }
    }

    resetVisualBoard() {
        document.getElementById('board').childNodes.forEach((node) => node.innerHTML = '');

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
