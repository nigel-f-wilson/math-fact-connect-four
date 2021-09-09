export function gameIsOver(gameStatus) {
    return (gameStatus === 'playerOneWins' || gameStatus === 'playerTwoWins' || gameStatus === 'gameDrawn')
}