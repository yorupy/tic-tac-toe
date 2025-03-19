
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
            return false;;
        } else {
            board[row][column] = player;
            return true;
        }
    }

    function checkEqualHorizontals() {
        for (let i = 0; i < 3; i++) {
            if (!board[i][0]) continue;
            if (board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                return {
                    direction: "horizontal",
                    row: i
                }
            }
        }
        return false;
    }

    function checkEqualVerticals() {
        for (let i = 0; i < 3; i++) {
            if (!board[0][i]) continue;
            if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]) {
                return {
                    direction: "vertical",
                    column: i
                }
            }
        }
        return false;
    }

    function checkEqualDiagonals() {
        if (board[1][1]) {
            if (board[0][0] === board[1][1] && board[1][1] == board[2][2]) {
                return {
                    direction: "left-diagonal"
                }
            } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                return {
                    direction: "right-diagonal"
                }
            }
        }
        return false;
    }

    function checkFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    return false;
                }
            }
        }
        return {
            direction: "none"
        }
    }

    function checkAll() {
        return checkEqualHorizontals() ||
            checkEqualVerticals() ||
            checkEqualDiagonals() ||
            checkFull();
    }

    populate();

    return { updateCell, checkAll }
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

function createGame(playerOne, playerTwo) {
    const players = [playerOne, playerTwo];
    const board = createGameboard();
    let round = 0;
    let currentPlayer = players[0];
    function changeCurrentPlayer() {
        round++;
        currentPlayer = players[round % 2];
    }

    function checkWin() {
        const result = board.checkAll();
        if (result) {
            return {
                winner: currentPlayer,
                ...result
            };
        }
        return false;

    }

    const getBoard = () => board;
    const getPlayers = () => players;
    const getCurrentPlayer = () => currentPlayer;
    const getRound = () => round;

    return { getBoard, getPlayers, getCurrentPlayer, getRound, changeCurrentPlayer, checkWin }
}

const DisplayController = (function () {
    const game = createGame(createPlayer("one", "x"), createPlayer("two", "o"));

    function createCell(row, column) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.textContent = " ";
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-column", column);
        cell.addEventListener("click", handleCellClick)
        return cell;
    }

    function handleCellClick(e) {
        const { row, column } = e.target.dataset;
        const player = game.getCurrentPlayer();
        if (game.getBoard().updateCell(row, column, player)) {
            e.target.textContent = player.getSymbol();
            const result = game.checkWin();
            if (result) {
                handleWin(result);
            } else {
                game.changeCurrentPlayer();
            }
        }
    }

    function disableCells() {
        const cells = document.querySelectorAll(".cell");
        for (const cell of cells) {
            cell.disabled = true;
        }
    }

    function handleWin(result) {
        disableCells();
        switch (result.direction) {

        }
    }

    function updateWinnerRow(row) {

    }

    function createBoard() {
        const main = document.querySelector("main");
        const board = document.createElement("div");
        board.classList.add("board");
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.append(createCell(i, j));
            }
        }
        main.append(board);
    }

    createBoard();
})();
