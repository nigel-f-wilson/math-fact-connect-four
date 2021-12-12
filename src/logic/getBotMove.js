import { getLowestUnclaimedCell } from './connectFourLogic';
import { chooseRandomFromArray } from './lowLevelHelpers';



export function getBotMove(moveList) {
    return chooseRandomFromArray(legalMoves(moveList))
}

function legalMoves(moveList) {
    let moves = []
    for (let col = 0; col < 7; col++) {
        moves.push(getLowestUnclaimedCell(col, moveList))
    }
    // console.log(`legalMoves: ${moves} `);
    return moves
}
