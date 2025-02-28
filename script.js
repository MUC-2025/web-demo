const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
let tiles = [];
let currentRedTile = null;
let score = 0;


const audio = new Audio("songs/Rihanna-Umbrella.mp3")

// start song at 0:55 (55s)
const AUDIO_START_TIME = 55

// end song at 1:35 (95s)
const AUDIO_END_TIME = 95

// Create 3x3 grid tiles
for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    grid.appendChild(tile);
    tiles.push(tile);

    // Add event listeners for both mouse and touch press interactions
    tile.addEventListener("mousedown", () => handleTileInteraction(i));
    tile.addEventListener("touchstart", (event) => {
        event.preventDefault(); // Prevents ghost clicks on touch devices
        handleTileInteraction(i);
    });
}

// guidelines:
// s: baseline position (safe space) 
// start at lyric: "Because, when the sun shine, we shine together" (0:50), end at "under my umbrella -ella -ella"(1:32)

// START AT 0:50, END AT 1:35)

// beat map (move this to another file)
// Umbrella tempo: 174 BPM, half-time: 87 BPM
// C#/Db major key, 4 beats/bar

// assuming for now each Rihanna syllable is around ~300ms for testing

// delay of 4 secs between start time

// notation: space is full-length note (300ms), 2 letter combos are half-length notes (150 ms)

// TODO: finish beat map from notebook
const startTimeDelay = 1000
let beatMap = [
    // Be-cause, [qw]

    { time: startTimeDelay + 150, tile: 0}, { time: startTimeDelay + 300, tile: 1 },
    // when the sun shine we shine toge-ther, [d z c a q w d ac]
    { time: startTimeDelay + 350, tile: 5}, { time: startTimeDelay + 650, tile: 6 }, 
    { time: startTimeDelay + 950, tile: 8}, { time: startTimeDelay + 1250, tile: 3 }, 
    { time: startTimeDelay + 1550, tile: 0}, { time: startTimeDelay + 1850, tile: 1 }, 
    { time: startTimeDelay + 2150, tile: 5}, { time: startTimeDelay + 2450, tile: 3 }, { time: startTimeDelay + 2450 + 150, tile: 8 }, 

    // Told you I'd be here for-ever

    // Said I'd always be your friend

    // Took an oath and imma stick it out to the end

    // now that it's raining more than ev-er

    // know that we'll still have each oth-er

    // you can stand under my um-bre-lla

    // you can stand under my um-bre-lla, el-la, el-la, eh, eh, eh

];


// Key mapping
const keyMapping = {
    'q': 0, 'w': 1, 'e': 2,
    'a': 3, 's': 4, 'd': 5,
    'z': 6, 'x': 7, 'c': 8
};

// function to highlight tile and turn it from red to yellow
function highlightTile(index) {
    // if a red tile exists and is pressed remove it
    if (currentRedTile !== null) {
        tiles[currentRedTile].classList.remove("red")
    }
    tiles[index].classList.add("red")

    // time out after ~300 ms?
    setTimeout(() => {
        tiles[index].classList.remove("red")
    }, 300)
}



// keep track of game timeouts
let gameTimeOuts = []

// Function to start game
function startGame() {
    
    // stopGame()
    // play song from start time
    audio.currentTime = AUDIO_START_TIME
    audio.play()

    // stop song at stop time
    setTimeout(() => {
        audio.pause()
        audio.currentTime = AUDIO_START_TIME
    }, (AUDIO_END_TIME - AUDIO_START_TIME) * 1000) // convert sec to millisecond


    // play beatmap
    beatMap.forEach(beat => {
        let timeoutId = setTimeout(() => {
            highlightTile(beat.tile);
        }, beat.time);
        
        // Store timeouts so they can be cleared when stopping
        gameTimeOuts.push(timeoutId);
    });
}


// function to stop game
function stopGame() {
    // pause audio
    audio.pause()
    audio.currentTime = AUDIO_START_TIME

    gameTimeOuts.forEach(timeoutId => {
        clearTimeout(timeoutId)
    })

    // reset score
    score = 0
    scoreDisplay.textContent = score

    tiles.forEach(tile => {
        tile.classList.remove('red', 'yellow')
    })

    alert("Game stopped")
}


// Function to change the red tile (randomly)
function randomChangeTile() {
    if (currentRedTile !== null) {
        tiles[currentRedTile].classList.remove("red");
    }
    let newRedTile = Math.floor(Math.random() * 9);
    currentRedTile = newRedTile;
    tiles[newRedTile].classList.add("red");
}



// Function to handle interactions
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

document.getElementById("startButton").addEventListener("click", startGame)
document.getElementById("stopButton").addEventListener("click", stopGame)

// setInterval(randomChangeTile, 1000);
