
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
                    direction: "left diagonal"
                }
            } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                return {
                    direction: "right diagonal"
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

    function setName(newName) {
        name = newName;
    }
    return { getName, getSymbol, setName }
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
        changeCurrentPlayer();
        return false;

    }

    function updatePlayerName(index, newName) {
        players[index].setName(newName);
    }

    const getCurrentPlayer = () => currentPlayer;

    return { updateCell: board.updateCell, getCurrentPlayer, checkWin, updatePlayerName }
}


const DisplayController = (function () {
    const game = createGame(createPlayer("one", "x"), createPlayer("two", "o"));
    const main = document.querySelector("main");

    function appendMainElements() {
        const center = createCenterContainer();
        const leftPlayerBox = createPlayerBox("x", "one");
        const rightPlayerBox = createPlayerBox("o", "two");
        main.append(leftPlayerBox, center, rightPlayerBox);
    }

    function createTextFeedback() {
        const paragraph = document.createElement("p");
        paragraph.classList.add("feedback");
        paragraph.textContent = "Waiting to start...";
        return paragraph;
    }

    function updateTextFeedback(text) {
        const feedback = document.querySelector(".feedback");
        feedback.textContent = text;
    }

    function createCenterContainer() {
        const div = document.createElement("div");
        div.classList.add("center");
        const feedback = createTextFeedback();
        const board = createBoard();
        div.append(feedback, board);
        return div;
    }

    function createResetButton() {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.textContent = "Start";
        button.classList.add("reset");

        button.addEventListener("click")
    }

    function handleResetClick(e) {

    }

    function createPlayerBox(symbol, placeholder) {
        const container = document.createElement("div");
        container.classList.add("player-box");
        const input = document.createElement("input");
        input.placeholder = placeholder;
        input.setAttribute("name", symbol);
        input.setAttribute("id", symbol)
        const symbolParagraph = document.createElement("p");
        const text = document.createTextNode("Symbol: ");
        const span = document.createElement("span");
        span.textContent = symbol;
        symbolParagraph.append(text, span);

        container.append(input, symbolParagraph);

        return container;
    }

    function createCell(row, column) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.textContent = " ";
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-column", column);
        cell.addEventListener("click", handleCellClick)
        return cell;
    }

    function createBoard() {
        const board = document.createElement("div");
        board.classList.add("board");
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.append(createCell(i, j));
            }
        }
        return board;
    }

    function handleCellClick(e) {
        const { row, column } = e.target.dataset;
        const player = game.getCurrentPlayer();
        if (game.updateCell(row, column, player)) {
            e.target.textContent = player.getSymbol();
            const result = game.checkWin();
            if (result) {
                handleGameOver(result);
            } else {
                updateTextFeedback(
                    `Player ${player.getName()} (${player.getSymbol()}) took cell [${row}, ${column}]`);
            }
        }
    }

    function switchCells(disabledState) {
        const cells = document.querySelectorAll(".cell");
        for (const cell of cells) {
            cell.disabled = disabledState;
        }
    }

    function handleGameOver(result) {
        switchCells(true);

        if (result.direction !== "none") {
            updateTextFeedback(`
                Player ${result.winner.getName()} (${result.winner.getSymbol()}) won with a ${result.direction}
                `);
        } else {
            updateTextFeedback(`It is a tie! Nobody wins!`);
        }

        switch (result.direction) {
            case "horizontal":
                style1DCells("row", result.row, "picked");
                break;
            case "vertical":
                style1DCells("column", result.column, "picked");
                break;
            case "left diagonal":
                styleDiagonalCells("left diagonal", "picked");
                break;
            case "right diagonal":
                styleDiagonalCells("right diagonal", "picked");
                break;
            default:
                styleAllCells("tie");
        }
    }

    function styleElements(elements, newClass) {
        for (const element of elements) {
            element.classList.add(newClass);
        }
    }

    function styleAllCells(newClass) {
        const cells = document.querySelectorAll(".cell");
        styleElements(cells, newClass);
    }

    function style1DCells(direction, index, newClass) {
        const cells = document.querySelectorAll(`.cell[data-${direction}="${index}"]`);
        styleElements(cells, newClass);
    }

    function styleDiagonalCells(direction, newClass) {
        const cells = [];
        if (direction === "left diagonal") {
            for (let i = 0; i < 3; i++) {
                cells.push(document.querySelector(
                    `.cell[data-row="${i}"][data-column="${i}"]`));
            }
        } else {
            for (let i = 0; i < 3; i++) {
                cells.push(document.querySelector(
                    `.cell[data-row="${2 - i}"][data-column="${i}"]`));
            }
        }
        styleElements(cells, newClass);
    }

    appendMainElements();
})();
