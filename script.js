
function createGameboard() {
    const board = [];
    function populateBoard() {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; i < 3; j++) {
                board[i][j] = null;
            }
        }
    }
    function updateCell(row, column, player) {
        board[row][column] = player;
    }

    function checkEqualHorizontals() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                return ["horizontal", i]
            }
        }
        return null;
    }

    populateBoard();

    return { updateCell }
}

function createPlayer(name, symbol) {
    function getName() {
        return name;
    }
    function getSymbol() {
        return symbol;
    }
    return { getName, getSymbol }
}


const Game = (function () {
    const players = [createPlayer("one", "x"), createPlayer("two", "o")];
    const board = createGameboard();
    let round = 0;
    let currentPlayer = players[0];
    function changePlayer() {
        currentPlayer = players[round % 2];
    }

    function play() {
        console.log("Starting game...");
        let winningSet;
        while (!winningSet) {
            console.log(`round #${round}, player${currentPlayer.getName()}`);
        }
    }
})();