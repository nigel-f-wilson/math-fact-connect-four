import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY UI components
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";

// MY Logical components
import { lineToCellsMap, cellToLinesMap } from '../logic/maps'   
import { intersect, gameIsOver, playerOnesNumbers, playerTwosNumbers, getBoardData } from '../logic/helpers'


// MUI  components
import { Typography, Container, Box } from '@material-ui/core'
import theme from '../theme';


export default function Play(props) {
    // const location = useLocation()
    // const { playMode, questionType} = location.state
    const playMode = "human"
    const questionType = "multiplication"

    const [moveList, setMoveList] = React.useState([])  // An Array of integers ranging -1 thru 41 of indeterminate length
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false)
    

    let currentTurnNumber = moveList.lenth
    
    
    // function getColumnData(columnIndex, boardData) {
    //     let columnData = boardData.filter((claimStatus, cellId) => cellId % 7 === columnIndex)
    // }
    function getColumnData(columnIndex) {
        let boardData = getBoardData(moveList)
        return boardData.filter((claimStatus, cellId) => cellId % 7 === columnIndex)
    }
    
    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////
    
    
    
    function handleColumnClick(columnIndex) {
        // Break into subroutines
        // 1 Get Cell (and expand)
        // 2 Generate Math Question
        // 3 Call ____ to set var questionAnsweredCorrectly
        // 4 
        
        
        
        // How do I make this "await"
        
        
        let columnData = getColumnData(columnIndex)
        let lowestUnclaimedRow = columnData.indexOf("unclaimed")
        let columnIsFull = (lowestUnclaimedRow === -1)
        if (gameIsOver(gameStatus) || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1
        }
        let lowestUnclaimedCell = lowestUnclaimedRow * 7 + columnIndex
        console.log(`Cell where a move WOULD be made: ${lowestUnclaimedCell}`)

        // This is where the Math Question Pop Up determines whether or not the move is made. 
        if (questionType !== "none") {
            // Transition to Elevate and Expand Lowest Unclaimed Cell to center over the board
            setQuestionModalOpen(true)


        }
        
        let MATH_QUESTION_CORRECT = true
        let PLAY_VS_BOT = false

        let moveToAdd = MATH_QUESTION_CORRECT ? lowestUnclaimedCell : -1
        let updatedMoveList = moveList.concat(moveToAdd)
        let updatedGameStatus = getGameStatus(updatedMoveList)
        setMoveList(updatedMoveList)
        setGameStatus(updatedGameStatus)

        if (PLAY_VS_BOT) {
            // This is where we Would find and make the Computer Move if in Play vs. Computer Mode
            // getBotMove
        }
        console.log(`updated moveList: ${updatedMoveList}`)
        // console.log(`YOU CLICKED COLUMN: ${columnIndex} Data: ${columnData}`)
        return 0;
    }
    function handleNewGameClick() {
        setMoveList([])
        setGameStatus('playerOnesTurn')
        console.log(`NEW GAME !!!`)
        return 0;
    }
    function handleUndoClick() {
        setMoveList(moveList.slice(0, -1))
        console.log(`UNDO !!!`)
        return 0;
    }

    
    // Returns ENUM: 'playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw'
    // This function efficiently checks to see if the last move created a win for the player who made it.
    function getGameStatus(moveList) {
        let lastPlayerToMove = (moveList.length % 2 === 1) ? "playerOne" : "playerTwo"
        let lastPlayersNumbers = (lastPlayerToMove === "playerOne") ? playerOnesNumbers(moveList) : playerTwosNumbers(moveList) 
        let lastMoveMade = Number(lastPlayersNumbers.slice(-1) )
        let linesAffectedByLastMove = cellToLinesMap.get(lastMoveMade)
        for (let i = 0; i < linesAffectedByLastMove.length; i++) {
            let line = linesAffectedByLastMove[i]
            let cellsInLine = lineToCellsMap.get(line)
            // For added efficiency I could at this point remove the lastMoveMade from cells in line and in the next line look for intersections of length 3.
            if (intersect(cellsInLine, lastPlayersNumbers).length === 4) {
                return (lastPlayerToMove === 'playerOne') ? 'playerOneWins' : 'playerTwoWins'
            }
        }
        return (moveList.length % 2 === 0) ? 'playerOnesTurn' : 'playerTwosTurn'
    }

    
    
    return (
        <Container 
            // maxWidth='lg' 
            // disableGutters 
            // sx={{ bgcolor: 'background',
            //     // height: '100%',
            //     display: 'flex',
            //     flexDirection: 'column'
            // }}
        >

            {/* ADD Math Question Popup */}

            <GameBoard
                moveList={moveList}
                gameStatus={gameStatus}
                handleColumnClick={handleColumnClick} 
            />
            {/* <InfoPanel 
                gameStatus={gameStatus}
                playMode={playMode}
                questionType={questionType}
                handleNewGameClick={handleNewGameClick}
            /> */}

        </Container>
    );
}