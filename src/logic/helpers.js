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

export function playerOnesNumbers(moveList) {
    return moveList.filter((cell, turn) => turn % 2 === 0).filter(cell => cell !== -1)
}
export function playerTwosNumbers(moveList) {
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
