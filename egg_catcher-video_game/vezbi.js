var nizaKvadrati = new Array();
var count = 0;
var player = document.getElementById("player");
var gameContainer = document.getElementById("game-container");
var shirina = gameContainer ? gameContainer.clientWidth - 50 : 1150;
var visina = gameContainer ? gameContainer.clientHeight : 750;
var igrac = {
    points: 0,
    lifes: 3,
    speed: 5,
    positionX: 50,
};
function movePlayer() {
    if (player) {
        player.style.left = "".concat(igrac.positionX, "%");
    }
}
// TO DO: 
// 1) napravi po smooth transition na dvizenjeto na igrachot so velocityMatter???  
// 2) otkako dojdde do levata strana, da ima moznost da se spawne na Desnata strana
// za polesno da stignuva  ##DONE
// 3)
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "a") {
        igrac.positionX -= igrac.speed;
    }
    else if (event.key === "ArrowRight" || event.key === "d") {
        igrac.positionX += igrac.speed;
    }
    if (igrac.positionX <= 8) {
        igrac.positionX = 91;
    }
    else if (igrac.positionX >= 92) {
        igrac.positionX = 9;
    }
    movePlayer();
});
function spawnObjects() {
    count++;
    var div = document.createElement("div");
    div.className = "kvadrat";
    div.id = "kvadrat-".concat(count);
    var pozicijaX = Math.floor(Math.random() * shirina);
    var pozicijaY = Math.floor(Math.random() * 250) + visina; //ODKOMENTIRAJ POSLE
    var brzina = Math.floor(Math.random() * 3);
    var poeni = Math.floor(brzina * 10);
    var kvadrat4e = {
        id: count,
        points: poeni,
        speed: brzina,
        positionX: pozicijaX,
        positionY: pozicijaY
    };
    div.style.left = "".concat(kvadrat4e.positionX, "px");
    div.style.bottom = "".concat(kvadrat4e.positionY, "px");
    div.style.opacity = "0";
    nizaKvadrati.push(kvadrat4e);
    gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.appendChild(div);
}
function updateStats() {
    var zivoti = document.getElementById("lifes");
    var scoreBoard = document.getElementById("score");
    if (zivoti && scoreBoard) {
        zivoti.innerHTML = "".concat(igrac.lifes);
        scoreBoard.innerHTML = "".concat(igrac.points);
    }
}
function startMoving() {
    if (isGameOver) {
        return;
    }
    var gameContainer = document.getElementById("game-container");
    var visina = gameContainer ? gameContainer.clientHeight : 750;
    if (player) {
        var playerRect_1 = player.getBoundingClientRect();
        nizaKvadrati.forEach(function (element) {
            var kvadratElement = document.getElementById("kvadrat-".concat(element.id));
            if (kvadratElement && player) {
                element.positionY -= element.speed;
                kvadratElement.style.bottom = "".concat(element.positionY, "px");
                if (element.positionY <= visina) {
                    kvadratElement.style.opacity = "1";
                }
                var kvadratRect = kvadratElement.getBoundingClientRect();
                if (kvadratRect.bottom >= playerRect_1.top &&
                    kvadratRect.left < playerRect_1.right &&
                    kvadratRect.right > playerRect_1.left) {
                    igrac.points += element.points;
                    kvadratElement.remove();
                }
                if (element.positionY <= 10) {
                    kvadratElement.remove();
                    igrac.lifes -= 1;
                    if (igrac.lifes === 0) {
                        gameOver();
                    }
                }
            }
            updateStats();
        });
    }
    requestAnimationFrame(startMoving);
}
var spawnInterval;
var isGameOver = false;
function gameOver() {
    isGameOver = true;
    clearInterval(spawnInterval);
    nizaKvadrati.forEach(function (element) {
        var kvadrat = document.getElementById("kvadrat-".concat(element.id));
        kvadrat === null || kvadrat === void 0 ? void 0 : kvadrat.remove();
        player === null || player === void 0 ? void 0 : player.remove();
    });
    var gameOverScreen = document.createElement("div");
    gameOverScreen.id = "game-over";
    gameOverScreen.innerHTML = "<h1>Game Over</h1><p>Score: ".concat(igrac.points, "</p>");
    gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.appendChild(gameOverScreen);
    var gameOverButton = document.createElement("button");
    gameOverButton.id = "play-again";
    gameOverButton.innerHTML = "PLAY AGAIN";
    gameOverButton.onclick = playAgain;
    gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.appendChild(gameOverButton);
}
function playAgain() {
    var _a, _b;
    isGameOver = false;
    (_a = document.getElementById("play-again")) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document.getElementById("game-over")) === null || _b === void 0 ? void 0 : _b.remove();
    igrac.lifes = 3;
    igrac.points = 0;
    igrac.positionX = 50;
    updateStats();
    movePlayer();
    var existingPlayer = document.getElementById("player");
    if (!existingPlayer) {
        var newPlayer = document.createElement("div");
        newPlayer.id = "player";
        newPlayer.className = "player";
        gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.appendChild(newPlayer);
        // Reassign the player variable
        player = newPlayer;
    }
    startGame();
}
function startGame() {
    var kopce = document.getElementById("PlayGameButton");
    if (kopce != null) {
        kopce.style.display = "none";
    }
    isGameOver = false;
    spawnInterval = setInterval(spawnObjects, 1000);
    requestAnimationFrame(startMoving);
}
