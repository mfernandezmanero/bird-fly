const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bird properties
let bird = {
  x: 50,
  y: canvas.height / 2,
  width: 40,
  height: 30,
  velocity: 0,
  gravity: 0.6,
  lift: -10,
};

// Game state
let gameOver = false;
let startTime = null;
let winTime = 20000; // 20 seconds

// Draw the bird
function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Update bird position
function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Prevent bird from going above the canvas
  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }

  // Check if bird hits the ground
  if (bird.y + bird.height > canvas.height) {
    gameOver = true;
    alert("Game Over! You hit the ground.");
  }
}

// Handle key presses
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code.includes("Arrow")) {
    bird.velocity = bird.lift;
  }
});

// Game loop
function gameLoop() {
  if (gameOver) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update bird
  drawBird();
  updateBird();

  // Check win condition
  if (!startTime) {
    startTime = Date.now();
  } else if (Date.now() - startTime >= winTime) {
    gameOver = true;
    alert("You Win! You survived for 20 seconds.");
  }

  // Repeat the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();