const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
const playButton = document.querySelector(".startbutton");
let currentShooterIndex = 202;
const width = 15;
const aliensRemoved = [];
let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;
let gameRunning = false;

for (let i = 0; i < width * width; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}
const squares = Array.from(document.querySelectorAll(".grid div"));
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}
draw();
squares[currentShooterIndex].classList.add("shooter");

playButton.addEventListener("click", toggleGame);

function toggleGame() {
  if (!gameRunning) {
    startGame();
    gameRunning = true;
  } else {
    location.reload();
  }
}

function startGame() {
  playButton.innerHTML = "Restart";

  function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove("invader");
    }
  }

  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    if (e.key === "a") {
      if (currentShooterIndex > 195) currentShooterIndex -= 1;
    }
    if (e.key === "d") {
      if (currentShooterIndex < 209) currentShooterIndex += 1;
    }
    squares[currentShooterIndex].classList.add("shooter");
  }

  document.addEventListener("keydown", moveShooter);

  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && isGoingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width + 1;
        direction = -1;
        isGoingRight = false;
      }
    }

    if (leftEdge && !isGoingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width - 1;
        direction = 1;
        isGoingRight = true;
      }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction;
    }

    draw();

    if (squares[currentShooterIndex].classList.contains("invader")) {
      resultDisplay.innerHTML = "GAME OVER";
      clearInterval(invadersId);
    }

    if (aliensRemoved.length === alienInvaders.length) {
      resultDisplay.innerHTML = "YOU WIN";
      clearInterval(invadersId);
    }
  }

  invadersId = setInterval(moveInvaders, 600);

  function shoot(e) {
    playShootSound();
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
        aliensRemoved.push(alienRemoved);
        results++;
        resultDisplay.innerHTML = "Score: " + results;
      }
    }

    if (e.key === "w") {
      laserId = setInterval(moveLaser, 100);
    }
  }

  document.addEventListener("keydown", shoot);

  function playShootSound() {
    const shootSound = document.getElementById("shootSound");
    shootSound.currentTime = 0; // Setze die Zeit auf den Anfang, falls der Sound bereits abgespielt wird
    shootSound.play();
  }
}
