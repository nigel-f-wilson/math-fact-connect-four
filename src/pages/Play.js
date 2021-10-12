import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY components
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";
import { MathQuestionModal } from "../components/MathQuestionModal";

// Game Logic
import { gameIsOver, getColumnData, getGameStatus } from '../gameLogic'
// Custom Hooks
import { useScreenWidth, useScreenHeight } from "../hooks"

// MUI  components
import { Box, Container } from '@material-ui/core'

export default function PlayPage(props) {
    // For Development don't useLocation until the different question modes are actually built. 
    // const location = useLocation()
    // const { playMode, questionType } = location.state
    const playMode = "human"
    const questionType = "multiplication"

    // LAYOUT
    const height = useScreenHeight()
    const width = useScreenWidth()
    const boardAreaSideLength = (height <= width) ? height : width

    // GAME STATE
    // MOVELIST --> An Array of integers ranging -1 thru 41 of indeterminate length
    // GAMESTATUS --> Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [moveList, setMoveList] = React.useState([])  
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')
    const [questionModalIsOpen, setQuestionModalIsOpen] = React.useState(false)
    
    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////
    function handleColumnClick(columnIndex) {
        let columnData = getColumnData(columnIndex, moveList)
        let lowestUnclaimedRow = columnData.indexOf("unclaimed")
        let columnIsFull = (lowestUnclaimedRow === -1)
        if (gameIsOver(gameStatus) || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1
        }
        let lowestUnclaimedCell = lowestUnclaimedRow * 7 + columnIndex
        // console.log(`Cell where a move WOULD be made: ${lowestUnclaimedCell}`)
        // This is where the Math Question Pop Up determines whether or not the move is made. 
        if (questionType !== "none") {
            // Transition to Elevate and Expand Lowest Unclaimed Cell to center over the board
            let question = generateQuestion(questionType)
            
            setQuestionModalIsOpen(true)


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
    function handleAnswerSubmit(answer) {



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
   

    function closeQuestionModal() {
        let timeout = 800
        
        // /determine if answer correct and display 
        
        // DO SOME OTHER STUFF
        setTimeout(() => {
            setQuestionModalIsOpen(false)
        }, timeout)

        
    }

    function generateQuestion(questionType) {
        
    }
    
    return (
        <Box id='play-page' sx={{
            height: boardAreaSideLength,
            width: boardAreaSideLength, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', }}>

            <MathQuestionModal 
                open={questionModalIsOpen}
                handleAnswerSubmit={handleAnswerSubmit}
                closeQuestionModal={closeQuestionModal}
                boardAreaSideLength={boardAreaSideLength}
            />
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
        </Box>
    )
}