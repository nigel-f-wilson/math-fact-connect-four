import { getLowestUnclaimedCell, playerOnesMoves, playerTwosMoves, cellIsUnclaimed } from './connectFourLogic';
import { lineToCellsMap, numberOfLines } from "./winningLineMaps";
import { chooseRandomFromArray, intersect } from './lowLevelHelpers';



export function getBotMove(moveList) {
    let wins = getWinningMovesForBot(moveList)
    let blocks = getDefensiveMovesForBot(moveList)
    let legalMoves = getLegalMoves(moveList)
    let winningMoves = intersect(wins, legalMoves)
    let blockingMoves = intersect(blocks, legalMoves)

    if (winningMoves.length > 0) {
        console.log(`Bot found Winning move "${wins}" in legal options ${legalMoves}`);
        return chooseRandomFromArray(winningMoves)
    }
    else if (blockingMoves.length > 0) {
        console.log(`Choosing bot move with threats: ${blocks} and legal options ${legalMoves}`);
        return chooseRandomFromArray(blockingMoves)
    }
    else {
        console.log(`Choosing RANDOM bot move with NO ways to win and NO ways to block.`);
        return chooseRandomFromArray(legalMoves)
    }
}

function getLegalMoves(moveList) {
    let moves = []
    for (let col = 0; col < 7; col++) {
        moves.push(getLowestUnclaimedCell(col, moveList))
    }
    // console.log(`legalMoves: ${moves} `);
    return moves
}

function getDefensiveMovesForBot(moveList) {
    let threats = []
    let humansMoves = playerOnesMoves(moveList)
    for (let lineId = 0; lineId < numberOfLines; lineId++) {
        let cellsInLine = lineToCellsMap.get(lineId)
        if (intersect(cellsInLine, humansMoves).length === 3) {
            console.log(`Found Threat in Line ${lineId}: ${cellsInLine}`);
            threats = threats.concat(cellsInLine.filter(cellId => !humansMoves.includes(cellId)))
        }
    }
    return threats
}

export function getWinningMovesForBot(moveList) {
    let wins = []
    let botsMoves = playerTwosMoves(moveList)
    for (let lineId = 0; lineId < numberOfLines; lineId++) {
        let cellsInLine = lineToCellsMap.get(lineId)
        if (intersect(cellsInLine, botsMoves).length === 3) {
            wins = wins.concat(cellsInLine.filter(cellId => cellIsUnclaimed(cellId, moveList)))
        }
    }
    console.log(`Found Wins: ${wins}`);
    return wins
}