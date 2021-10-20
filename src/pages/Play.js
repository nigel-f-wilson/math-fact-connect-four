import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY components
import { Menu } from "../components/Menu";
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
        activeColumn: null,
        topic: null,   // 'combining',
        questionFormatString: null,  // 'a+b=c',
        vars: [1,2,3]
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
        console.log(`QUESTION: ${JSON.stringify(question)}`);
        
        setModalState({
            isOpen: true,
            activeCell: lowestUnclaimedCell,
            activeColumn: columnIndex,
            question: {
                topic: 'combining',
                formatString: 'a+b=c',
                missingVar: 'c',
                vars: [1, 2, 3],
            }
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
        console.log(`NEW GAME !!!`)
        return 0;
    }
    function handleUndoClick() {
        setMoveList(moveList.slice(0, -1))
        console.log(`UNDO !!!`)
        return 0;
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

            <Menu 
                handleNewGameClick={handleNewGameClick}
                sx={{
                    height: '5%',
                    width: '5%',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    
                }}

            />

            
            
            <MathQuestionModal 
                modalState={modalState}
                open={modalState.isOpen}
                // open={questionModalIsOpen}
                handleAnswerSubmit={handleAnswerSubmit}
                // closeQuestionModal={closeQuestionModal}
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