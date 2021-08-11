// A "line" is a set of four squareIds that together form a win.
// There are four 'types' of Line: 'vertical', 'horizontal', 'upslash', 'downslash'
// There are 64 lines and 42 squares. 
// This module exports two high-level constants that map these two types of id to one another.
// 1) lineIdToSquareIdsMap  could be renamed "squaresInLine". It takes a lineId 0-63 and gives back the four squares in it.
// 2) squareIdToLineIdsMap  could be renamed "linesThatIncludeSquare". It takes a squareId 0-41 and gives back the 3 to 13 lines that square is part of.

// Low-level Constants
const squaresPerCol = 6;
const squaresPerRow = 7;
const totalSquares = squaresPerCol * squaresPerRow;
const linesPerCol = (squaresPerCol >= 4) ? (squaresPerCol - 3) : 0;
const linesPerRow = (squaresPerRow >= 4) ? (squaresPerRow - 3) : 0;
const numberOfVerticalLines = linesPerCol * squaresPerRow;
const numberOfHorizontalLines = linesPerRow * squaresPerCol;
const numberOfUpslashLines = linesPerCol * linesPerRow;
const numberOfDownslashLines = linesPerCol * linesPerRow;

export const lineIdToSquareIdsMap = () => {
    let completeMap = new Map();
    let partialMaps = [verticalLineMap(), horizontalLineMap(), upslashLineMap(), downslashLineMap()]

    partialMaps.forEach(partialMap => {
        partialMap.forEach((squareIdList, lineId) => {
            completeMap.set(lineId, squareIdList);
        });
    })
    // CONFUSING point: For now I have just silenced the following console.log because it runs everytime handleColumnClick is called.  This means the map is being recreated from scratch each turn of the game unnecesarily. Perhaps I could solve this by moving the entire ClassicGame() inside a wrapper component that is strictly for holding complex CONSTANTS that ClassGame uses but only needs to compute once such as the Maps.
    console.log(`Generated the Maps between lineIds and squareIds. Size: ${completeMap.size} LineIds in the Map.`)
    // completeMap.forEach(logMapElement);
    // The following four HELPERS bear responsibility for corresponding the lists of squares to their correct final lineIds.  This is simple for vertical lines but requires consideartion of the startingId for the latter three. 
    function verticalLineMap() {
        let map = new Map();
        // Vertical Lines are assigned Ids starting from Zero.
        let currentLineId = 0;

        // for (let squareId = 0; squareId < totalSquares; squareId++) {
        for (let squareId = 0; squareId < numberOfVerticalLines; squareId++) {
            if (isStartOfVerticalLine(squareId)) {
                let first = squareId + 0;
                let second = squareId + 1;
                let third = squareId + 2;
                let fourth = squareId + 3;
                let squaresInLine = [first, second, third, fourth];
                map.set(currentLineId, squaresInLine);
                currentLineId++;
            }
        }
        return map;
    }
    function horizontalLineMap() {
        let map = new Map();
        // Horizontal Lines are assigned Ids starting from numberOfVerticalLines.
        let currentLineId = numberOfVerticalLines;
        for (let squareId = 0; squareId < totalSquares; squareId++) {
            if (isStartOfHorizontalLine(squareId)) {
                let first = squareId + (0 * squaresPerCol);
                let second = squareId + (1 * squaresPerCol);
                let third = squareId + (2 * squaresPerCol);
                let fourth = squareId + (3 * squaresPerCol);
                let squaresInLine = [first, second, third, fourth];
                map.set(currentLineId, squaresInLine);
                currentLineId++;
            }
        }
        return map;
    }
    function upslashLineMap() {
        let map = new Map();
        // Upslash Lines are assigned Ids starting from numberOfVerticalLines + numberOfHorizontalLines.
        let currentLineId = numberOfVerticalLines + numberOfHorizontalLines;
        for (let squareId = 0; squareId < totalSquares; squareId++) {
            if (isStartOfUpslashLine(squareId)) {
                let first = squareId + 0 * (squaresPerCol + 1);
                let second = squareId + 1 * (squaresPerCol + 1);
                let third = squareId + 2 * (squaresPerCol + 1);
                let fourth = squareId + 3 * (squaresPerCol + 1);
                let squaresInLine = [first, second, third, fourth];
                map.set(currentLineId, squaresInLine);
                currentLineId++;
            }
        }
        return map;
    }
    function downslashLineMap() {
        let map = new Map();
        // Downslash Lines are assigned Ids starting from numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines.
        let currentLineId = numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines;
        for (let squareId = 0; squareId < totalSquares; squareId++) {
            if (isStartOfDownslashLine(squareId)) {
                let first = squareId + 0 * (squaresPerCol - 1);
                let second = squareId + 1 * (squaresPerCol - 1);
                let third = squareId + 2 * (squaresPerCol - 1);
                let fourth = squareId + 3 * (squaresPerCol - 1);
                let squaresInLine = [first, second, third, fourth];
                map.set(currentLineId, squaresInLine);
                currentLineId++;
            }
        }
        return map;
    }
    return completeMap;
}

export const squareIdToLineIdsMap = () => {
    let squaresToLinesMap = new Map();
    for (let squareId = 0; squareId < totalSquares; squareId++) {
        squaresToLinesMap.set(squareId, []);
    }
    lineIdToSquareIdsMap.forEach((squaresInLineList, lineId) => {
        squaresInLineList.forEach(squareId => {
            squaresToLinesMap.set(squareId, squaresToLinesMap.get(squareId).concat(lineId));
        })
    })
    // CONFUSING point: For now I have just silenced the following console.log because it runs everytime handleColumnClick is called.  This means the map is being recreated from scratch each turn of the game unnecesarily. Perhaps I could solve this by moving the entire ClassicGame() inside a wrapper component that is strictly for holding complex CONSTANTS that ClassGame uses but only needs to compute once such as the Maps.
    console.log(`Mapped each of the ${totalSquares} SquareIds to the set of all Lines that include it.`)
    // squaresToLinesMap.forEach(logMapElement);
    return squaresToLinesMap;
}


