// MY Logical components
import { lineToCellsMap, cellToLinesMap } from './winningLineMaps'


export function gameIsOver(gameStatus) {
    return (gameStatus === 'playerOneWins' || gameStatus === 'playerTwoWins' || gameStatus === 'gameDrawn')
}

// This function could be made more efficient through using sorted arrays and pointers that 
// enabled us to not re-scan the leading portion of setTwo when we know we are looking for a 
// higher number it only makes sense to look in higher indices. Besides that, early returns 
// could be added in case the lowest or highest numbers in setOne fall outside the range of 
// setTwo. This intersect is being made with setOne.length === 4 (cells in line) and a 
// potentially much longer setTwo (player's numbers)
export function intersect(setOne, setTwo) {
    return setOne.filter(item => setTwo.includes(item))
}

export function playerOnesMoves(moveList) {
    return moveList.filter((cell, turn) => turn % 2 === 0).filter(cell => cell !== -1)
}
export function playerTwosMoves(moveList) {
    return moveList.filter((cell, turn) => turn % 2 === 1).filter(cell => cell !== -1)
}

export function getBoardData(moveList) {
    let data = new Array(42).fill("unclaimed")
    moveList.forEach((move, turn) => {
        if (move !== -1) {
            let player = turn % 2 === 0 ? "playerOne" : "playerTwo"
            data[move] = player
        }
    })
    return data
}
// const boardData = getBoardData(moveList)  I don't like that getColumnData is called 7 times and each time it calls getBoardData rather than caching this result and reusing it, updating it automatically only when the moveList updates. useEffect could help?
function getColumnData(columnIndex, moveList) {
    let boardData = getBoardData(moveList)
    return boardData.filter((claimStatus, cellId) => cellId % 7 === columnIndex)
}

export function getLowestUnclaimedCell(columnIndex, moveList) {
    let columnData = getColumnData(columnIndex, moveList)
    let lowestUnclaimedRow = columnData.indexOf("unclaimed")
    let lowestUnclaimedCell = (lowestUnclaimedRow === -1) ? -1 : (lowestUnclaimedRow * 7 + columnIndex)
    // console.log(`lowestUnclaimedCell in col ${columnIndex} is cell "${lowestUnclaimedCell}"`);
    return lowestUnclaimedCell
}


export function nextPlayer(gameStatus) {
    if (gameIsOver(gameStatus)) {
        console.error(`Do not call nextPlayer() when the game is over.`);
    }
    return (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"
} 
export function nextPlayersMoves(gameStatus, moveList) {
    if (gameIsOver(gameStatus)) {
        console.error(`Do not call nextPlayersMoves() when the game is over.`);
    }
    return (gameStatus === "playerOnesTurn") ? playerOnesMoves(moveList) : playerTwosMoves(moveList)
}
export function nextPlayerColor(gameStatus) {
    return gameIsOver(gameStatus) ? "unclaimed" : (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"
}
// function getNextPlayersMoves() {
//     if (gameStatus === "playerOnesTurn") {
//         return playerOnesMoves(moveList)
//     }
//     else if (gameStatus === "playerTwosTurn") {
//         return playerTwosMoves(moveList)
//     }
//     else {
//         console.warn(`getNextPlayersMoves was called but the game is already over`);
//         return []
//     }
// }


function getLastChipDropped(moveList) {
    let ml = moveList.slice()
    let lastCellId
    do {
        lastCellId = ml.pop()
    } while (lastCellId === -1)
    return lastCellId
}

// Returns ENUM: 'playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw'
// This function efficiently checks to see if the last move created a win for the player who made it.
export function getGameStatus(moveList) {
    let lastPlayerToMove = (moveList.length % 2 === 1) ? "playerOne" : "playerTwo"
    let lastPlayersMoves = (lastPlayerToMove === "playerOne") ? playerOnesMoves(moveList) : playerTwosMoves(moveList)
    let lastMoveMade = Number(lastPlayersMoves.slice(-1))
    let linesAffectedByLastMove = cellToLinesMap.get(lastMoveMade)
    for (let i = 0; i < linesAffectedByLastMove.length; i++) {
        let line = linesAffectedByLastMove[i]
        let cellsInLine = lineToCellsMap.get(line)
        // For added efficiency I could at this point remove the lastMoveMade from cells in line and in the next line look for intersections of length 3.
        if (intersect(cellsInLine, lastPlayersMoves).length === 4) {
            return (lastPlayerToMove === 'playerOne') ? 'playerOneWins' : 'playerTwoWins'
        }
    }
    let nonSkippedTurns = moveList.filter(cellId => cellId !== -1)
    if (nonSkippedTurns.length >= 42) {
        return 'gameOverDraw'
    }
    else {
        return (moveList.length % 2 === 0) ? 'playerOnesTurn' : 'playerTwosTurn'
    }
}