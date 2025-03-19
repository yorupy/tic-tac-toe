
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
        board[row][column] = player;
    }

    function checkEqualHorizontals() {
        for (let i = 0; i < 3; i++) {
            if (!board[0][i]) continue;
            if (board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                return ["horizontal", [[i, 0], [i, 1], [i, 2]]]
            }
        }
        return null;
    }

    function checkEqualVerticals() {
        for (let i = 0; i < 3; i++) {
            if (!board[0][i]) continue;
            if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]) {
                return ["vertical", [[0, i], [1, i], [2, i]]];
            }
        }
        return null;
    }

    function checkEqualDiagonals() {
        if (board[1][1]) {
            if (board[0][0] === board[1][1] && board[1][1] == board[2][2]) {
                return ["left-diagonal", [[0, 0], [1, 1], [2, 2]]];
            } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                return ["right-diagonal", [[2, 0], [1, 1], [0, 2]]];
            }
        }
        return null;
    }

    function checkAll() {
        return checkEqualHorizontals || checkEqualVerticals || checkEqualDiagonals;
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
            board.print();
            const move = prompt("Select row, column: ");
            const [row, column] = move.split(",");
            board.updateCell(row, column, currentPlayer);
            round++;
            changePlayer();
        }
    }

    return { play }
})();

Game.play();