const lettersArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const gameGrid = [];

const invalidPositions = [];     
const shipPositions = {};

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

function validateLocation(cell) { return invalidPositions.includes(cell) ? false : true; }

function setInitialXY() {
    let x = Math.floor(Math.random() * gameGrid.length);
    let y = Math.floor(Math.random() * gameGrid[x].length);
    let cell =  gameGrid[x][y];
    let valid = validateLocation(cell);

    while(!valid) {
        x = Math.floor(Math.random() * gameGrid.length);
        y = Math.floor(Math.random() * gameGrid[firstX].length);
        cell =  gameGrid[firstX][firstY];
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

    invalidPositions.push(...shipCodes);
    return shipCodes;
}

function setLocation(units) {
    const currentShipLocation = [];
    const initialValues = setInitialXY();
    const [firstX, firstY, firstCell] = initialValues;
    const unitsNeeded = units - 1;
    const shipPoints = buildShip(unitsNeeded, firstX, firstY); 

    currentShipLocation.push(firstCell, ...shipPoints);
    

    return currentShipLocation;
}

buildGrid(10);
const ship5 = buildShip(5);
const ship4 = buildShip(4);
const ship3 = buildShip(3);
const ship2 = buildShip(3);
const ship1 = buildShip(2);

console.log(`
    invalidOptions: ${invalidPositions}
    ship5: ${ship5}
    ship4: ${ship4}
    ship3: ${ship3}
    ship2: ${ship2}
    ship1: ${ship1}
`)





// console.log(gameGrid.includes('A1'));
// console.log(`x: ${shipUpOrDown()}, y: ${shipLeftOrRight()}`);
