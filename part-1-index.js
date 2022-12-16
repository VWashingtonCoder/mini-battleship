var rs = require('readline-sync');

const defaultBoard = [
    'A1', 'A2', 'A3', 
    'B1', 'B2', 'B3', 
    'C1', 'C2', 'C3'
];
let ships = [];
let guesses = [];
let active = true;


function randomNumber(max) { return Math.floor(Math.random() * max); };

function setShips() {
    let board = defaultBoard;
    const shipOne = board[randomNumber(board.length)];
    
    board = board.filter((ship) => ship !== shipOne);
    
    const shipTwo = board[randomNumber(board.length)];
    
    ships.push(shipOne, shipTwo);
};

function handleGuess(guess) {
    const id = ships.indexOf(guess);
    
    if(guesses.includes(guess)) {
        console.log('You have already picked this location. Miss!');
        return;
    } else guesses.push(guess);
    
    if(ships.includes(guess)) {
        ships.splice(id, 1);

        if (ships.length === 1){
            console.log(`Hit. You sunk a battle ship. ${ships.length} ship remaining.`);
            guesses.push(guess);
        } 
    } else console.log('You have missed!');    
};

function runGame() {
    setShips();

    console.log(`ships: ${ships}, guesses: ${guesses}`);

    while (ships.length > 0) {
        let userEntry = rs.keyInSelect(defaultBoard, 'Enter a location to strike (ie A2)');
        
        if (userEntry === -1) return;
        else handleGuess(defaultBoard[userEntry]);
    }    
}

function restart() {
    const restart = rs.keyInYN('You have destroyed all battleships. Would you like to play again? ');

    if(restart === true) {
        guesses = [];
        runGame();
    } else active = restart;
}

const start = rs.keyIn('Press any key to start the game');

if (start) runGame();

while(active === true){
    restart();
}
