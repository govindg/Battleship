window.onload = () => {
    var rows = 8;
    var cols = 8;
    var size = 40;

    var block = {
        width: 2,
        height: 2,
        hits: 0,
        numBlocks: 4
    };

    var l = {
        width: 2,
        height: 3,
        hits: 0,
        numBlocks: 4
    };

    var line = {
        width: 1,
        height: 4,
        hits: 0,
        numBlocks: 4
    };

    function createGrid() {
        var grid = [];
        for (var i = 0; i < cols; i++) {
            var row = [];
            for (var j = 0; j < rows; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        populateBlock(grid);
        populateBlock(grid);
        populateL(grid);
        populateLine(grid);
        return grid;
    }

    function checkBounds(xcoord, ycoord, obj, grid) {
        for (var y = ycoord + (obj.height - 1); y >= ycoord; y--) {
            if (grid[xcoord][y] == 1) {
                return false;
            }
        }

        for (var x = xcoord + (obj.width - 1); x >= xcoord; x--) {
            if (grid[x][ycoord] == 1) {
                return false;
            }
        }

        return true;
    }

    function populateBlock(grid) {
        var canPlace = false;
        while (!canPlace) {
            var xcoord = Math.floor(Math.random() * rows);
            var ycoord = Math.floor(Math.random() * cols);
            if (xcoord + (block.width - 1) < cols) {
                if (ycoord + (block.height - 1) < rows) {
                    if (checkBounds(xcoord, ycoord, block, grid)) {
                        canPlace = true;
                        grid[xcoord][ycoord] = 1;
                        grid[xcoord + 1][ycoord] = 1;
                        grid[xcoord][ycoord + 1] = 1;
                        grid[xcoord + 1][ycoord + 1] = 1;
                    }
                }
            }
        }
    }

    function populateL(grid) {
        var canPlace = false;
        while (!canPlace) {
            var xcoord = Math.floor(Math.random() * rows);
            var ycoord = Math.floor(Math.random() * cols);
            if (xcoord + (l.width - 1) < cols) {
                if (ycoord + (l.height - 1) < rows) {
                    if (checkBounds(xcoord, ycoord, l, grid)) {
                        canPlace = true;
                        for (var y = ycoord; y <= (ycoord + l.height) - 1; y++) {
                            grid[xcoord][y] = 1;
                        }
                        grid[xcoord + 1][y - 1] = 1;
                    }
                }
            }
        }
    }

    function populateLine(grid) {
        var canPlace = false;
        while (!canPlace) {
            var xcoord = Math.floor(Math.random() * rows);
            var ycoord = Math.floor(Math.random() * cols);
            if (xcoord + (line.width - 1) < cols) {
                if (ycoord + (line.height - 1) < rows) {
                    if (checkBounds(xcoord, ycoord, line, grid)) {
                        canPlace = true;
                        for (var y = ycoord; y <= ycoord + (line.height - 1); y++) {
                            grid[xcoord][y] = 1;
                        }
                    }
                }
            }
        }
    }

    if (!this.sessionStorage.getItem("player1grid") || !this.sessionStorage.getItem("player2grid")) {
        var grid1 = createGrid();
        var grid2 = createGrid();

        this.sessionStorage.setItem("player1grid", JSON.stringify(grid1));
        this.sessionStorage.setItem("player2grid", JSON.stringify(grid2));
        this.sessionStorage.setItem("player1shots", "0");
        this.sessionStorage.setItem("player2shots", "0");
        this.sessionStorage.setItem("player1directhits", "0");
        this.sessionStorage.setItem("player2directhits", "0");
        console.log(this.sessionStorage.getItem("player1directhits"));
        this.sessionStorage.setItem("currentplayer", "player1");
    }

    if (this.sessionStorage.getItem("currentplayer") == "player1") {
        document.querySelector("#playerheader").textContent = "Player 1's Turn";
        document.querySelector("#boardheader").textContent = "Player 1's Board";
        document.querySelector("#otherboardheader").textContent = "Player 2's Board";
    } else {
        document.querySelector("#playerheader").textContent = "Player 2's Turn";
        document.querySelector("#boardheader").textContent = "Player 2's Board";
        document.querySelector("#otherboardheader").textContent = "Player 1's Board";
    }
    var player1grid = JSON.parse(this.sessionStorage.getItem("player1grid"));
    var player2grid = JSON.parse(this.sessionStorage.getItem("player2grid"));
    var currentPlayer = this.sessionStorage.getItem("currentplayer");
    console.log(currentPlayer);
    displayCurrentPlayerGrid();
    displayOtherPlayerGrid();
    var reset = document.querySelector("#reset");
    reset.addEventListener("click", (event) => {
        this.sessionStorage.clear();
        window.location.reload(true);
    });

    function displayCurrentPlayerGrid() {
        var currentGrid = [];
        if (currentPlayer == "player1") {
            currentGrid = player1grid.slice();
        } else {
            currentGrid = player2grid.slice();
        }

        var board = document.querySelector("#board");
        for (i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                var gridelement = document.createElement("div");
                gridelement.id = "" + i + j;
                gridelement.classList.add("gridelement");
                var x = i * size;
                var y = j * size;

                gridelement.style.top = y + 'px';
                gridelement.style.left = x + 'px';
                if (currentGrid[i][j] == 1) {
                    gridelement.style.backgroundColor = "grey";
                } else if (currentGrid[i][j] == 2) {
                    gridelement.style.backgroundColor = "red";
                } else if (currentGrid[i][j] == 3) {
                    gridelement.style.backgroundColor = "blue";
                }
                board.appendChild(gridelement);
            }  
        }
    }

    function displayOtherPlayerGrid() {
        var nextButton = document.querySelector("#nextbutton");
        var otherGrid;
        var otherPlayer;
        if (currentPlayer == "player1") {
            otherPlayer = "player2";
            otherGrid = player2grid.slice();
        } else {
            otherPlayer = "player1";
            otherGrid = player1grid.slice();
        }

        var otherboard = document.querySelector("#otherboard");
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                var gridelement = document.createElement("div");
                gridelement.id = "other " + i + j;
                gridelement.classList.add("gridelement");
                var x = i * size;
                var y = j * size;

                gridelement.style.top = y + "px";
                gridelement.style.left = (400 + x) + "px";
                if (otherGrid[i][j] == 2) {
                    gridelement.style.backgroundColor = "red";
                } else if (otherGrid[i][j] == 3) {
                    gridelement.style.backgroundColor = "blue";
                }
                otherboard.appendChild(gridelement);
            }
        }

        otherboard.addEventListener("click", (event) => {
            if (event.target !== event.currentTarget) {
                var idelements = event.target.id.split(" ");
                var rowCol = idelements[1].split("");
                var i = parseInt(rowCol[0]);
                var j = parseInt(rowCol[1]);
                if (otherGrid[i][j] == 0) {
                    otherGrid[i][j] = 3;
                    event.target.style.backgroundColor = "blue";
                    if (currentPlayer == "player1") {
                        var hits = parseInt(this.sessionStorage.getItem("player1shots"));
                        this.sessionStorage.setItem("player1shots", "" + (hits + 1));
                    } else {
                        var hits = parseInt(this.sessionStorage.getItem("player2shots"));
                        this.sessionStorage.setItem("player2shots", "" + (hits + 1));
                    }
                } else if (otherGrid[i][j] == 1) {
                    otherGrid[i][j] = 2;
                    event.target.style.backgroundColor = "red";
                    if (currentPlayer == "player1") {
                        var hits = parseInt(this.sessionStorage.getItem("player1shots"));
                        this.sessionStorage.setItem("player1shots", "" + (hits + 1));
                    } else {
                        var hits = parseInt(this.sessionStorage.getItem("player2shots"));
                        this.sessionStorage.setItem("player2shots", "" + (hits + 1));
                    }
                    var directHits = parseInt(this.sessionStorage.getItem(otherPlayer + "directhits"));
                    this.sessionStorage.setItem(otherPlayer + "directhits", "" + (directHits + 1));
                }
                this.sessionStorage.setItem(otherPlayer + "grid", JSON.stringify(otherGrid));
                otherboard.classList.add("disablediv");
                nextButton.style.visibility = "visible";
                if (parseInt(this.sessionStorage.getItem(otherPlayer + "directhits")) == 16) {
                    nextButton.textContent = "Finish Game";
                    this.sessionStorage.setItem("winner", currentPlayer);
                    nextButton.href = "./endgame.html";
                } else if (otherPlayer == "player1") {
                    nextButton.textContent = "Player 1's turn";
                } else {
                    nextButton.textContent = "Player 2's turn";
                }
            }
        });

        if (!this.sessionStorage.getItem("winner")) {
            nextButton.addEventListener("click", (event) => {
                event.target.style.visibility = "hidden";
                this.sessionStorage.setItem("currentplayer", otherPlayer);
                var currentboard = document.querySelector("#board");
                var otherboard = document.querySelector("#otherboard");

                if (otherPlayer == "player2") {
                    document.querySelector("#playerheader").textContent = "Player 2's Turn";
                    document.querySelector("#boardheader").textContent = "Player 2's Board";
                    document.querySelector("#otherboardheader").textContent = "Player 1's Board";
                    window.location.reload(true);
                } else {
                    document.querySelector("#playerheader").textContent = "Player 1's Turn";
                    document.querySelector("#boardheader").textContent = "Player 1's Board";
                    document.querySelector("#otherboardheader").textContent = "Player 2's Board";
                    window.location.reload(true);
                }

                while (currentboard.firstChild) {
                    currentboard.removeChild(currentboard.firstChild);
                }

                while (otherboard.firstChild) {
                    otherboard.removeChild(otherboard.firstChild);
                }

                displayCurrentPlayerGrid();
                displayOtherPlayerGrid();

                window.location.reload(true);
            });
        }

    }
};