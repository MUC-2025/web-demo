const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
let tiles = [];
let currentRedTile = null;
let score = 0;

// Create 3x3 grid tiles
for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    grid.appendChild(tile);
    tiles.push(tile);

    // Add touch event listener for touchscreen interaction
    tile.addEventListener("click", () => handleTileInteraction(i));
}

// Key mapping
const keyMapping = {
    'q': 0, 'w': 1, 'e': 2,
    'a': 3, 's': 4, 'd': 5,
    'z': 6, 'x': 7, 'c': 8
};

// Function to change the red tile
function changeTile() {
    if (currentRedTile !== null) {
        tiles[currentRedTile].classList.remove("red");
    }
    let newRedTile = Math.floor(Math.random() * 9);
    currentRedTile = newRedTile;
    tiles[newRedTile].classList.add("red");
}

// Function to handle both keyboard and touchscreen input
function handleTileInteraction(tileIndex) {
    tiles[tileIndex].classList.add("yellow");
    setTimeout(() => tiles[tileIndex].classList.remove("yellow"), 200);

    if (tileIndex === currentRedTile) {
        score++;
        scoreDisplay.textContent = score;
    }
}

// Keyboard event listener
document.addEventListener("keydown", (event) => {
    if (keyMapping[event.key] !== undefined) {
        handleTileInteraction(keyMapping[event.key]);
    }
});

setInterval(changeTile, 1000);
