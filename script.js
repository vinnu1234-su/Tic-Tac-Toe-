document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");
    const resultScreen = document.getElementById("resultScreen");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes("")) {
            return "T"; // Tie
        }

        return null;
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== "") {
            return;
        }

        gameBoard[index] = currentPlayer;
        cells[index].innerText = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            showResultScreen(winner);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function showResultScreen(result) {
        gameActive = false;
        let message = "";

        if (result === "T") {
            message = "It's a Tie!";
        } else {
            message = `${result} is the Winner!`;
        }

        resultScreen.innerHTML = `
            <div class="result">${message}</div>
            <button id="newGameButton">New Game</button>
        `;

        const newGameButton = document.getElementById("newGameButton");
        newGameButton.addEventListener("click", handleNewGameClick);

        resultScreen.style.display = "block";
    }

    function handleNewGameClick() {
        resultScreen.style.display = "none";
        resetGame();
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => (cell.innerText = ""));
        currentPlayer = "X";
        gameActive = true;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    resetButton.addEventListener("click", () => {
        resultScreen.style.display = "none";
        resetGame();
    });
});
