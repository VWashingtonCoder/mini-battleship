var rs = require('readline-sync');
const start = rs.keyIn('Press any key to start the game');
const lettersArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const gameGrid = [];
const shipMap = [];     
let ships = [];
let guesses = [];
let active = true;

function setupGame() {
    function buildGrid(num) {
        let cellCode = '';
        let letterCode = 0;
    
        while (letterCode < num) {
            let row = [];
            for(let i = 1; i <= num; i++) { 
                cellCode = lettersArr[letterCode] + i;
                row.push(cellCode); 
            }
            gameGrid.push(row);
            letterCode++;
        }
    }
    
    function randomPick(type) {
        const randomNum = Math.floor(Math.random() * 2);
        let output = '';
    
        if(type === 'direction') output = randomNum === 0 ? 'x' : 'y';
        else if(type === 'operator') output = randomNum === 0 ? '+' : '-';
        
        return output;
    }
    
    function validateLocation(cell) { return shipMap.includes(cell) ? false : true; }
    
    function setInitialXY() {
        let x = Math.floor(Math.random() * gameGrid.length);
        let y = Math.floor(Math.random() * gameGrid[x].length);
        let cell =  gameGrid[x][y];
        let valid = validateLocation(cell);
    
        while(!valid) {
            x = Math.floor(Math.random() * gameGrid.length);
            y = Math.floor(Math.random() * gameGrid[x].length);
            cell =  gameGrid[x][y];
        }
    
        return [x, y, cell];
    }
    
    function buildShip(units) {
        let [firstX, firstY, firstCell] = setInitialXY();
        let direction = randomPick('direction');
        let shipCodes = [firstCell];
        let operator = randomPick('operator');
        let currentX = firstX;
        let currentY = firstY;
        let currentCell = '';
        let unitsLeft = units-1;
        let valid = undefined;
    
        while (unitsLeft > 0) {
            if (direction === 'x' && operator === '+') {
                if(currentX === 9) currentX = (firstX - unitsLeft);
                else currentX = currentX + 1;
            
            } else if (direction === 'x' && operator === '-') {    
                if(currentX === 0) currentX = (firstX + unitsLeft);
                else currentX = currentX - 1;
            
            } else if (direction === 'y' && operator === '+') {
                if(currentY === 9) currentY = (firstY - unitsLeft);
                else currentY = currentY + 1;
            
            } else if (direction === 'y' && operator === '-') {
                if(currentY === 0) currentY = (firstY + unitsLeft);
                else currentY = currentY - 1;
            } 
    
            currentCell = gameGrid[currentX][currentY];
            valid = validateLocation(currentCell);
    
            if (valid) {
                shipCodes.push(currentCell);
                unitsLeft--;
            } else {
                let [resetX, resetY, resetCell] = setInitialXY();
    
                shipCodes = [resetCell];
                currentX = resetX;
                currentY = resetY;
                direction = randomPick('direction');
                operator = randomPick('operator');
                unitsLeft = units-1;
            }
        }
    
        shipMap.push(...shipCodes);
        ships.push(shipCodes);    
        return shipCodes;
    }
        
    buildGrid(10);
    buildShip(2); 
    buildShip(3);
    buildShip(3);
    buildShip(4);
    buildShip(5);
}

function runGame() {
    function handleGuess(guess) {
        if(guesses.includes(guess)) {
            console.log('You have already picked this location. Miss!');
            return;
        } else guesses.push(guess);

        if(shipMap.includes(guess)) {
            let id = shipMap.indexOf(guess);
            shipMap.splice(id, 1);
    
            if (shipMap.length > 1){
                console.log(`Hit. You got a battle ship spot. ${shipMap.length} battle ship spot(s) remaining.`);
            }
        } else console.log('You have missed!');

    }
    
    rs.setDefaultOptions({ limit: [...gameGrid, 'q'] });

    while(shipMap.length > 0) {
        let userEntry = rs.question('Enter a location to strike (e.g. C6) or q to quit');

        if(userEntry == 'q') {
            active = false;
            return;
        } else handleGuess(userEntry.toUpperCase());
    }

}

function restart() {
    const restart = rs.keyInYN('You have destroyed all battleships. Would you like to play again? ');

    if(restart === true) {
        guesses = [];
        setupGame();
        runGame();
    } else active = restart;
}



if (start){
    setupGame();
    runGame();
}

while(active === true) restart();
