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
}

// Key mapping
const keyMapping = {
    'q': 0, 'w': 1, 'e': 2,
    'a': 3, 's': 4, 'd': 5,
    'z': 6, 'x': 7, 'c': 8
};

function changeTile() {
    if (currentRedTile !== null) {
        tiles[currentRedTile].classList.remove("red");
    }
    let newRedTile = Math.floor(Math.random() * 9);
    currentRedTile = newRedTile;
    tiles[newRedTile].classList.add("red");
}

document.addEventListener("keydown", (event) => {
    if (keyMapping[event.key] !== undefined) {
        let tileIndex = keyMapping[event.key];
        tiles[tileIndex].classList.add("yellow");
        setTimeout(() => tiles[tileIndex].classList.remove("yellow"), 200);

        if (tileIndex === currentRedTile) {
            score++;
            scoreDisplay.textContent = score;
        }
    }
});

setInterval(changeTile, 1000);
