var rs = require('readline-sync');

let board = [
    'A1', 'A2', 'A3', 
    'B1', 'B2', 'B3', 
    'C1', 'C2', 'C3'
];
let ships = [];

function randomNumber(max) { return Math.floor(Math.random() * max); }

function setShips() {
    const shipOne = board[randomNumber(board.length)];
    const removedBoard = board.filter((ship) => ship !== shipOne);
    const shipTwo = removedBoard[randomNumber(removedBoard.length)];

    ships.push(shipOne, shipTwo);
}



const start = rs.keyIn('Press any key to start the game');

if (start) {
    setShips();
};

console.log(ships);

