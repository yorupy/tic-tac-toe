
const Gameboard = (function () {
    const board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    function updateCell(row, column, symbol) {
        board[row][column] = symbol;
    }

})();

const Game = (function () {

})();


function createPlayer(name, symbol) {
    return { name, symbol }
}