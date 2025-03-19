
function createGameboard() {
    const board = [];
    function populate() {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = null;
            }
        }
    }

    function updateCell(row, column, player) {
        if (board[row][column]) {
            return "occupied";
        }
        board[row][column] = player;
    }

    function checkEqualHorizontals() {
        for (let i = 0; i < 3; i++) {
            if (!board[i][0]) continue;
            if (board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                return ["horizontal", [[i, 0], [i, 1], [i, 2]], board[i][0]];
            }
        }
        return null;
    }

    function checkEqualVerticals() {
        for (let i = 0; i < 3; i++) {
            if (!board[0][i]) continue;
            if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]) {
                return ["vertical", [[0, i], [1, i], [2, i]], board[0][i]];
            }
        }
        return null;
    }

    function checkEqualDiagonals() {
        if (board[1][1]) {
            if (board[0][0] === board[1][1] && board[1][1] == board[2][2]) {
                return ["left-diagonal", [[0, 0], [1, 1], [2, 2]], board[1][1]];
            } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                return ["right-diagonal", [[2, 0], [1, 1], [0, 2]], board[1][1]];
            }
        }
        return null;
    }

    function checkFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    return false;
                }
            }
        }
        return ["tie", null, null];
    }

    function checkAll() {
        return checkEqualHorizontals() ||
            checkEqualVerticals() ||
            checkEqualDiagonals() ||
            checkFull();
    }

    function getCellSymbol(row, column) {
        return board[row][column] ? board[row][column].getSymbol() : " ";
    }

    function print() {
        for (let i = 0; i < 3; i++) {
            console.log(
                `${getCellSymbol(i, 0)} | ${getCellSymbol(i, 1)} | ${getCellSymbol(i, 2)}`
            )
            if (i !== 2) {
                console.log("__________")
            }
        }
    }

    populate();

    return { updateCell, checkAll, print }
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

const DisplayController = (function () {
    // function createBoard() {
    //     const main = document.querySelector("main");
    //     const board = document.createElement("div");
    //     board.classList.add("board");
    // }
});


function createGame(playerOne, playerTwo) {
    const players = [playerOne, playerTwo];
    const board = createGameboard();
    let round = 0;
    let currentPlayer = players[0];
    function changeCurrentPlayer() {
        currentPlayer = players[round % 2];
    }
    const getBoard = () => board;
    const getPlayers = () => players;
    const getCurrentPlayer = () => currentPlayer;
    const getRound = () => round;

    return { getBoard, getPlayers, getCurrentPlayer, getRound, changeCurrentPlayer }
}
