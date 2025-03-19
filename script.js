
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
    return { name, symbol }
}


const Game = (function () {


})();