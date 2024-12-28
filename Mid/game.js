// Game Elements
const board = document.getElementById("game");
const scoreContainer = document.querySelector(".score-container");
const currentScoreElement = document.getElementById("current-score");
const highScoreElement = document.getElementById("high-score");

// Game Configuration
const boardSize = 20;
const cellSize = 20;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScore = 0;
let hasMoved = false;

// Load High Score
function loadHighScore() {
  const storedHighScore = localStorage.getItem("highScore");
  highScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
  highScoreElement.textContent = `High Score: ${highScore}`;
}

// Save High Score
function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
}

// Update Scores
function updateScores() {
  currentScoreElement.textContent = `Score: ${score}`;
  saveHighScore();
}

// Generate Food
function generateFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

// Render Board
function renderBoard() {
  board.innerHTML = ""; // Clear board

  // Render Food
  const foodElement = document.createElement("div");
  foodElement.style.position = "absolute";
  foodElement.style.width = `${cellSize}px`;
  foodElement.style.height = `${cellSize}px`;
  foodElement.style.left = `${food.x * cellSize}px`;
  foodElement.style.top = `${food.y * cellSize}px`;
  foodElement.style.backgroundColor = "#ffd3da"; // Pastel pink food
  board.appendChild(foodElement);

  // Render Snake
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.position = "absolute";
    snakeElement.style.width = `${cellSize}px`;
    snakeElement.style.height = `${cellSize}px`;
    snakeElement.style.left = `${segment.x * cellSize}px`;
    snakeElement.style.top = `${segment.y * cellSize}px`;
    snakeElement.style.backgroundColor = "#333"; // Dark snake color
    board.appendChild(snakeElement);
  });
}

// Move Snake
function moveSnake() {
  if (!hasMoved) return;

  const newHead = {
    x: (snake[0].x + direction.x + boardSize) % boardSize,
    y: (snake[0].y + direction.y + boardSize) % boardSize,
  };

  // Check collision with self
  if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    updateScores();
    generateFood();
  } else {
    snake.pop();
  }

  renderBoard();
}

// Reset Game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  score = 0;
  hasMoved = false;
  currentScoreElement.textContent = `Score: ${score}`;
  loadHighScore();
  generateFood();
  renderBoard();
}

// Handle Key Presses
function handleKeydown(event) {
  hasMoved = true;
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function fetchHighScore() {
  return fetch("/game")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const highScoreElement = doc.querySelector("#high-score");
      return parseInt(highScoreElement.textContent.split(": ")[1], 10) || 0;
    });
}

// Initialize Game
function initGame() {
  fetchHighScore().then((serverHighScore) => {
    highScore = serverHighScore; // Fetch from server
    highScoreElement.textContent = `High Score: ${highScore}`;
    createBoard();
    renderBoard();
    document.addEventListener("keydown", handleKeydown);
    setInterval(moveSnake, 200);
  });
}

// Create Board
function createBoard() {
  board.style.position = "relative";
  board.style.width = `${boardSize * cellSize}px`;
  board.style.height = `${boardSize * cellSize}px`;
  board.style.border = "3px solid #ffb9c5"; // Pink border
  board.style.backgroundColor = "#fff"; // White background
  board.style.marginTop = "10px";

  // Restore old design for scores
  scoreContainer.style.display = "flex";
  scoreContainer.style.justifyContent = "space-between";
  scoreContainer.style.backgroundColor = "#ffb9c5"; // Pastel pink background
  scoreContainer.style.padding = "10px"; // Increased padding to make it taller
  scoreContainer.style.marginTop = "10px";
  scoreContainer.style.borderRadius = "10px 10px 0 0";
  scoreContainer.style.color = "#fff";
  scoreContainer.style.fontWeight = "bold";

  currentScoreElement.style.fontSize = "16px";
  highScoreElement.style.fontSize = "16px";
}

// Function to submit score to the server
function submitScoreToServer(score) {
  fetch("/game/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score }),
  }).then((response) => {
    if (!response.ok) {
      console.error("Failed to submit score to the server.");
    }
  });
}

// Update `saveHighScore` to also submit the score to the server
function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreElement.textContent = `High Score: ${highScore}`;
    submitScoreToServer(highScore); // Submit to the server
  }
}

// Start Game
initGame();
