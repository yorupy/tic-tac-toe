
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

})();