import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY components
import { InGameMenu, AccountMenu } from "../components/Menu";
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";
import { MathQuestionModal } from "../components/MathQuestionModal";

// Game Logic
import { gameIsOver, getColumnData, getGameStatus, } from '../gameLogic'
import { getQuestion } from '../questionGenerator'

// Custom Hooks
import { useScreenWidth, useScreenHeight } from "../hooks"

// MUI  components
import { Box, Container } from '@material-ui/core'

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

    // GAME STATE
    // MOVELIST --> An Array of integers ranging -1 thru 41 of indeterminate length
    // GAMESTATUS --> Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [moveList, setMoveList] = React.useState([])  
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')
    
    const [modalState, setModalState] = React.useState({
        isOpen: false,
        activeCell: 5,
        question: {
            topic: 'combining',
            inputType: 'textField',
            instruction: "What number makes this equation true?",
            formatString: 'a+b=c',  // Change this to use Latex
            missingVar: 'c',
            vars: [1, 2, 3],
        }
    })
    // const [modalState, setModalState] = React.useState({
    //     isOpen: false,
    //     activeCell: null,
    //     question: {
    //         topic: null,
    //         instruction: null,
    //         formatString: null,
    //         vars: [1, 2, 3],
    //         missingVar: null,
    //     }
    // })


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
        console.log(`QUESTION: ${JSON.stringify(question)}`);
        
        setModalState({
            isOpen: true,
            activeCell: lowestUnclaimedCell,
            question: {
                topic: 'combining',
                inputType: 'textField',
                instruction: null,
                formatString: 'a+b=c',  // Change this to use Latex
                missingVar: 'c',
                vars: [1, 2, 3],
            }
        })
    }
    function closeQuestionModal() {
        setModalState({
            isOpen: false,
            activeCell: null,
            question: null
        })
    }
    function handleAnswerSubmit(answer) {
        const { isOpen, activeCell, activeColumn, question } = modalState
        const { topic, formatString, missingVar, vars } = question



        let MATH_QUESTION_CORRECT = true

        let moveToAdd = MATH_QUESTION_CORRECT ? activeCell : -1
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
                closeQuestionModal={closeQuestionModal}
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