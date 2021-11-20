import React from 'react'
import { useLocation, useParams } from "react-router-dom"
import PropTypes from 'prop-types'

// ICONS
import { HomeIcon } from "../icons";

// MY components
import { InGameMenu, AccountMenu } from "../components/Menu";
import { GameBoard } from "../components/GameBoard";
import { MathQuestionModal } from "../components/MathQuestionModal";

// Game Logic
import { gameIsOver, getColumnData, getGameStatus, } from '../gameLogic'
import { getQuestion } from '../questionGenerator'

// Custom Hooks
import { useScreenWidth, useScreenHeight } from "../hooks"

// MUI  components
import { Box, AppBar, Toolbar, IconButton } from '@material-ui/core'

export default function PlayPage(props) {
    // For Development don't useLocation until the different question modes are actually built. 
    const location = useLocation()
    const { opponent, mathTopics, timeLimit } = location.state
    // console.log(`PLAY PAGE`);
    // console.log(`Opponent: ${opponent}`);
    let mathTopicsArray = Object.keys(mathTopics).filter(key => mathTopics[key] === true)
    // console.log(`MathTopics: ${mathTopicsArray}`);
    // console.log(`TimeLimit: ${timeLimit}`);

    // LAYOUT
    const height = useScreenHeight()
    const width = useScreenWidth()
    const boardAreaSideLength = (height <= width) ? height : width

    // QUESTION INTERFACE
    // interface Question {
    //     topic: string,
    //     inputType: string,
    //     instruction: string,
    //     formatString: string,  // Change this to use Latex
    //     vars: Array<number>,
    //     missingVar: number,
    // }
    // const unsetQuestion = 
    
    
    // GAME STATE
    // MOVELIST --> An Array of integers ranging -1 thru 41 of indeterminate length
    // GAMESTATUS --> Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [moveList, setMoveList] = React.useState([])  
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')
    
    const [modalState, setModalState] = React.useState({  // INITIALIZE  STATE
        isOpen: false,
        activeCell: -1,
        question: {
            topic: "",
            inputType: "",      
            instruction: null,
            formatString: null,  // Change this to use Latex
            vars: [],
            missingVar: null,
        }
    })

    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////
    function handleColumnClick(columnIndex) {
        let columnData = getColumnData(columnIndex, moveList)
        let lowestUnclaimedRow = columnData.indexOf("unclaimed")
        let lowestUnclaimedCell = lowestUnclaimedRow * 7 + columnIndex
        let columnIsFull = (lowestUnclaimedRow === -1)
        if (gameIsOver(gameStatus) || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1
        }
        let question = getQuestion(mathTopics, columnIndex)
        console.log(`QUESTION: ${JSON.stringify(question)}`)
        
        setModalState({
            isOpen: true,
            activeCell: lowestUnclaimedCell,
            question: {
                topic: 'combining',
                inputType: 'textField',
                instruction: null,
                formatString: 'a+b=c',  // Change this to use Latex
                vars: [1, 2, 3],
                missingVar: 2,      // Thin index in the vars array of the term to leave blank. 

            }
        })
    }
    
    
    function handleAnswerSubmit(answer) {
        const { isOpen, activeCell, question } = modalState
        const { vars, missingVar } = question

        // let answer = answer.trim whitespace and remove commas
        console.log(`Answer submitted was ${(answer === vars[missingVar]) ? 'CORRECT' : 'WRONG'}`)
        let moveToAdd = (answer === vars[missingVar]) ? activeCell : -1 // Check if answer is correct
        let updatedMoveList = moveList.concat(moveToAdd)
        let updatedGameStatus = getGameStatus(updatedMoveList)
        setMoveList(updatedMoveList)
        setGameStatus(updatedGameStatus)

        if (opponent === "bot") {
            console.error(`IT IS THE BOT'S TURN BUT GETBOTMOVE HAS NOT BEEN DEFINED`)
            // let botsUpdatedMoveList = moveList.concat(getBotMove(updatedMoveList))
            // let botsUpdatedGameStatus = getGameStatus(botsUpdatedMoveList)
            // setMoveList(botsUpdatedMoveList)
            // setGameStatus(botsUpdatedGameStatus)
            // console.log(`moveList after BOT's move: ${botsUpdatedMoveList}`)
        }
        return 0
    }

    function handleNewGameClick() {
        setMoveList([])
        setGameStatus('playerOnesTurn')
        setModalState({
            isOpen: false,
            activeCell: null,
            topic: null,   // 'combining',
            questionFormatString: null,  // 'a+b=c',
            vars: [1, 2, 3]
        })
        console.log(`NEW GAME !!!`)
    }
    function handleUndoClick() {
        let shortenedMoveList = moveList.slice(0, -1)
        setMoveList(shortenedMoveList)
        setGameStatus(getGameStatus(shortenedMoveList))
        setModalState({
            isOpen: false,
            activeCell: null,
            topic: null,   // 'combining',
            answerFormat: "textField", // "textField" or "compareButtons"
            questionFormatString: null,  // 'a+b=c',
            vars: [1, 2, 3]
        })
        console.log(`UNDO !!!`)
    }
   

    // function closeQuestionModal() {
    //     let timeout = 800
        
    //     // /determine if answer correct and display 
        
    //     // DO SOME OTHER STUFF
    //     setTimeout(() => {
    //         setQuestionModalIsOpen(false)
    //     }, timeout)

        
    // }

    function generateQuestion(questionType) {
        
    }
    
    return (
        <Box id='play-page' sx={{
            height: boardAreaSideLength,
            width: boardAreaSideLength, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            position: 'relative' 
        }}>
            <InGameMenu
                handleNewGameClick={handleNewGameClick}
                handleUndoClick={handleUndoClick}
            />

            <MathQuestionModal 
                modalState={modalState}
                // open={modalState.isOpen}
                handleAnswerSubmit={handleAnswerSubmit}
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
            {/* <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer">
                        <HomeIcon />
                    </IconButton>
                    <IconButton color="inherit" aria-label="open drawer">
                        <HomeIcon />
                    </IconButton><IconButton color="inherit" aria-label="open drawer">
                        <HomeIcon />
                    </IconButton><IconButton color="inherit" aria-label="open drawer">
                        <HomeIcon />
                    </IconButton>
                </Toolbar>
            </AppBar> */}
        </Box>
    )
}