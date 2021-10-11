import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY UI components
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";
import { MathQuestionModal } from "../components/MathQuestionModal";

// MY Logical helpers
import { gameIsOver, getBoardData, getColumnata, getGameStatus } from '../logic/helpers'

// MUI  components
import { Container } from '@material-ui/core'

export default function Play(props) {
    // For Development don't useLocation until the different question modes are actually built. 
    // const location = useLocation()
    // const { playMode, questionType } = location.state
    const playMode = "human"
    const questionType = "multiplication"

    // GAME STATE
    // MOVELIST --> An Array of integers ranging -1 thru 41 of indeterminate length
    // GAMESTATUS --> Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [moveList, setMoveList] = React.useState([])  
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false)
    
    
    
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