import React from 'react'

// PAGES
import WelcomePage from "./pages/Welcome"
// import SettingsPage from "./pages/Settings"
// import PlayPage from "./pages/Play"
import InfoPage from "./pages/Info"
// MY components
import { InGameMenu, AccountMenu } from "./components/Menu";
import { GameBoard } from "./components/GameBoard";
import { MathQuestionModal } from "./components/MathQuestionModal";
// import { GameSettingsModal } from "./components/GameSettingsModal";

// Game Logic
import { gameIsOver, getColumnData, getGameStatus, } from './gameLogic'
import { getQuestion } from './questionGenerator'

// Custom Hooks
import { useScreenWidth, useScreenHeight } from "./hooks"


// MUI  components
import { CssBaseline, Box } from '@material-ui/core'



// THEME
import theme from "./theme"
import { ThemeProvider, } from '@material-ui/core/styles'

export default function App() {
    // Hard Coded Game Settings
    let opponent = "human"
    let mathTopics = ["combining"]
    let timeLimit = 30

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
    // DISPLAY --> Enum ['gameBoard', 'settingsModal', 'questionModal', 'infoModal']
    // MOVELIST --> An Array of integers ranging -1 thru 41 of indeterminate length
    // GAMESTATUS --> Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [display, setDisplay] = React.useState('settingsModal')
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
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Box id='root'
                    sx={{
                        // border: 'solid red 5px',
                        bgcolor: 'background',
                        height: '100vh',
                        width: '100vw',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* <WelcomePage /> */}
                    {/* <PlayPage /> */}
                    {/* <InfoPage /> */}
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
                        
                    </Box>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}