interface Kvadrat {
  id: number;
  points: number;
  speed: number;
  positionX: number;
  positionY: number;
}

interface Igrac {
  points: number;
  lifes: number;
  speed: number;
  positionX: number;
}

const nizaKvadrati: Array<Kvadrat> = new Array();
var count: number = 0;

let player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const shirina: number = gameContainer ? gameContainer.clientWidth - 50 : 1150;
const visina: number = gameContainer ? gameContainer.clientHeight : 750;

const igrac: Igrac = {
  points: 0,
  lifes: 3,
  speed: 5,
  positionX: 50,
}

function movePlayer() {
  if (player) {
    player.style.left = `${igrac.positionX}%`
  }
}
// TO DO: 
// 1) napravi po smooth transition na dvizenjeto na igrachot so velocityMatter???  
// 2) otkako dojdde do levata strana, da ima moznost da se spawne na Desnata strana
// za polesno da stignuva  ##DONE
// 3)

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "a") {
    igrac.positionX -= igrac.speed;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    igrac.positionX += igrac.speed;
  }
  if (igrac.positionX <= 8) {
    igrac.positionX = 91;
  } else if (igrac.positionX >= 92) {
    igrac.positionX = 9;
  }
  movePlayer();
});


function spawnObjects() {
  count++;
  const div = document.createElement("div");
  div.className = "kvadrat";
  div.id = `kvadrat-${count}`;

  const pozicijaX: number = Math.floor(Math.random() * shirina);
  const pozicijaY: number = Math.floor(Math.random() * 250) + visina;    //ODKOMENTIRAJ POSLE
  const brzina: number = Math.floor(Math.random() * 3);
  const poeni: number = Math.floor(brzina * 10)

  const kvadrat4e: Kvadrat = {
    id: count,
    points: poeni,
    speed: brzina,
    positionX: pozicijaX,
    positionY: pozicijaY
  }

  div.style.left = `${kvadrat4e.positionX}px`;
  div.style.bottom = `${kvadrat4e.positionY}px`;
  div.style.opacity = "0";

  nizaKvadrati.push(kvadrat4e);
  gameContainer?.appendChild(div);
}

function updateStats() {
  const zivoti = document.getElementById("lifes");
  const scoreBoard = document.getElementById("score");
  if (zivoti && scoreBoard) {
    zivoti.innerHTML = `${igrac.lifes}`;
    scoreBoard.innerHTML = `${igrac.points}`;
  }
}

function startMoving() {
  if (isGameOver) {
    return;
  }
  const gameContainer = document.getElementById("game-container");
  const visina = gameContainer ? gameContainer.clientHeight : 750;
  if (player) {
    const playerRect = player.getBoundingClientRect();
    nizaKvadrati.forEach(element => {
      const kvadratElement = document.getElementById(`kvadrat-${element.id}`);
      if (kvadratElement && player) {
        element.positionY -= element.speed;
        kvadratElement.style.bottom = `${element.positionY}px`;
        if (element.positionY <= visina) {
          kvadratElement.style.opacity = "1";
        }
        const kvadratRect = kvadratElement.getBoundingClientRect();
        if (
          kvadratRect.bottom >= playerRect.top &&
          kvadratRect.left < playerRect.right &&
          kvadratRect.right > playerRect.left
        ) {
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
let spawnInterval: number | NodeJS.Timeout;
let isGameOver: boolean = false;

function gameOver() {
  isGameOver = true;
  clearInterval(spawnInterval);
  nizaKvadrati.forEach(element => {
    const kvadrat = document.getElementById(`kvadrat-${element.id}`);
    kvadrat?.remove();
    player?.remove();
  })
  const gameOverScreen = document.createElement("div");
  gameOverScreen.id = "game-over";
  gameOverScreen.innerHTML = `<h1>Game Over</h1><p>Score: ${igrac.points}</p>`;
  gameContainer?.appendChild(gameOverScreen);
  const gameOverButton = document.createElement("button");
  gameOverButton.id="play-again";
  gameOverButton.innerHTML=`PLAY AGAIN`;
  gameOverButton.onclick=playAgain;
  gameContainer?.appendChild(gameOverButton);
}
function playAgain(){
  isGameOver=false;
  
  document.getElementById("play-again")?.remove();
  document.getElementById("game-over")?.remove();
  
  igrac.lifes=3;
  igrac.points=0;
  igrac.positionX=50;
  
  updateStats();
  movePlayer()
  
  let existingPlayer = document.getElementById("player");
  if (!existingPlayer) {
    const newPlayer = document.createElement("div");
    newPlayer.id = "player";
    newPlayer.className = "player";
    gameContainer?.appendChild(newPlayer);

    // Reassign the player variable
    player = newPlayer;
  }
  
  startGame();
}

function startGame() {
  const kopce = document.getElementById("PlayGameButton");
  if (kopce != null) {
    kopce.style.display = "none";
  }
  isGameOver = false;
  spawnInterval = setInterval(spawnObjects, 1000);
  requestAnimationFrame(startMoving);
}