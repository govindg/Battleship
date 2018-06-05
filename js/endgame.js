window.onload = () => {
    var rows = 8;
    var cols = 8;
    var size = 40;
    var winnerHeader = document.querySelector("#winnerheader");

    if (this.sessionStorage.getItem("winner") == "player1") {
        winnerheader.textContent = "Player 1 Wins!";
    } else {
        winnerheader.textContent = "Player 2 Wins!";
    }

    document.querySelector("#player1shots").textContent = "Number of Shots from Player 1: " +
        this.sessionStorage.getItem("player1shots");
    document.querySelector("#player2shots").textContent = "Number of Shots from Player 2: " +
        this.sessionStorage.getItem("player2shots");
    document.querySelector("#restart").addEventListener("click", (event) => {
        this.sessionStorage.clear();
    });
    
    var player1grid = JSON.parse(this.sessionStorage.getItem("player1grid"));
    var player2grid = JSON.parse(this.sessionStorage.getItem("player2grid"));

    var board = document.querySelector("#board");
    var otherboard = document.querySelector("#otherboard");

    for (i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var gridelement = document.createElement("div");
            gridelement.id = "" + i + j;
            gridelement.classList.add("gridelement");
            var x = i * size;
            var y = j * size;

            gridelement.style.top = (75 + y) + 'px';
            gridelement.style.left = x + 'px';
            if (player1grid[i][j] == 1) {
                gridelement.style.backgroundColor = "grey";
            } else if (player1grid[i][j] == 2) {
                gridelement.style.backgroundColor = "red";
            } else if (player1grid[i][j] == 3) {
                gridelement.style.backgroundColor = "blue";
            }
            board.appendChild(gridelement);
        }
    }

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            var gridelement = document.createElement("div");
            gridelement.id = "" + i + j;
            gridelement.classList.add("gridelement");
            var x = i * size;
            var y = j * size;

            gridelement.style.top = (75 + y) + 'px';
            gridelement.style.left = (400 + x) + 'px';
            if (player2grid[i][j] == 1) {
                gridelement.style.backgroundColor = "grey";
            } else if (player2grid[i][j] == 2) {
                gridelement.style.backgroundColor = "red";
            } else if (player2grid[i][j] == 3) {
                gridelement.style.backgroundColor = "blue";
            }
            otherboard.appendChild(gridelement);
        }
    }
};