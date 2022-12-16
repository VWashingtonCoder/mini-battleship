var rs = require('readline-sync');

let boardArr = [
    'A1', 'A2', 'A3', 
    'B1', 'B2', 'B3', 
    'C1', 'C2', 'C3'
];

let shipOne = undefined;
let shipTwo = undefined;

function randomNumber(max) { return Math.floor(Math.random() * max); }

function setShip(board) {
    let randomShipId = randomNumber(board.length);
    let shipCode = boardArr[randomShipId];
    return shipCode;
}

const start = rs.keyIn('Press any key to start the game');

if (start) {
    shipOne = setShip(boardArr);
    const removedBoard = boardArr.filter((ship) => ship !== shipOne);
    shipTwo = setShip(removedBoard);
};


