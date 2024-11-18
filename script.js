"use strict";

const gameContainer = document.querySelector("#game-container");
const player = document.querySelector("#player");
const enemy = document.querySelector("#enemy");

document.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    keysPressed[e.key] = true;
    startPlayerMovement();
  }
});

document.addEventListener("keyup", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    keysPressed[e.key] = false;
    if (!Object.values(keysPressed).some((pressed) => pressed)) {
      stopPlayerMovement();
    }
  }
});

let playerPos = { x: 0, y: 0 };
let enemyPos = { x: 10, y: 10 };

const keysPressed = {};
let playerMovementInterval = null;
let enemyMovementInterval = null;

updatePosition(player, playerPos);
updatePosition(enemy, enemyPos);
startEnemyMovement();

function movePlayer() {
  let newX = playerPos.x;
  let newY = playerPos.y;

  if (keysPressed["ArrowUp"] && playerPos.y > 0) {
    newY--;
  }
  if (keysPressed["ArrowDown"] && playerPos.y < 19) {
    newY++;
  }
  if (keysPressed["ArrowLeft"] && playerPos.x > 0) {
    newX--;
  }
  if (keysPressed["ArrowRight"] && playerPos.x < 19) {
    newX++;
  }

  // Opdater position hvis den har ændret sig
  if (newX !== playerPos.x || newY !== playerPos.y) {
    playerPos = { x: newX, y: newY };
    updatePosition(player, playerPos);
    checkCollision();
  }
}

function startPlayerMovement() {
  if (!playerMovementInterval) {
    movePlayer();
    playerMovementInterval = setInterval(movePlayer, 300);
  }
}

function stopPlayerMovement() {
  if (playerMovementInterval) {
    clearInterval(playerMovementInterval);
    playerMovementInterval = null;
  }
}

function moveEnemy() {
  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  const availableDirections = directions.filter((dir) => {
    const newX = enemyPos.x + dir.x;
    const newY = enemyPos.y + dir.y;
    return newX >= 0 && newX < 20 && newY >= 0 && newY < 20;
  });

  const randomDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)];

  if (randomDirection) {
    enemyPos = {
      x: enemyPos.x + randomDirection.x,
      y: enemyPos.y + randomDirection.y,
    };
    updatePosition(enemy, enemyPos);
    checkCollision();
  }
}

function startEnemyMovement() {
  if (!enemyMovementInterval) {
    enemyMovementInterval = setInterval(moveEnemy, 300);
  }
}

function updatePosition(element, position) {
  const tileSize = 40;
  element.style.transform = `translate(${position.x * tileSize}px, ${position.y * tileSize}px)`;
}

function checkCollision() {
  if (playerPos.x === enemyPos.x && playerPos.y === enemyPos.y) {
    player.style.filter = "brightness(0.5) sepia(1)";
    enemy.style.filter = "brightness(0.5) sepia(1)";
  } else {
    player.style.filter = "none";
    enemy.style.filter = "none";
  }
}
