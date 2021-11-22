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
    // GAME SETTINGS
    const [opponent, setOpponent] = React.useState("human")
    const [mathTopics, setMathTopics] = React.useState(["combining"])  // An array of all types player wants
    // const [timeLimit, setTimeLimit] = React.useState(30)

    // GAME STATUS
    const [moveList, setMoveList] = React.useState([])  // An Array of integers ranging -1 thru 41 of indeterminate length
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')  // Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [activeCell, setActiveCell] = React.useState(false)
    const [openModal, setOpenModal] = React.useState("none") // Enum: "none", "question", "abandonGame", "newGameSettings", 

    
    // 
    // const [questionModalIsOpen, setQuestionModalIsOpen] = React.useState(false)
    // const [gameSettingsModalIsOpen, setGameSettingsModalIsOpen] = React.useState(false)
    // const [inGameMenuIsOpen, setInGameMenuIsOpen] = React.useState(false)
    // const [abandonGameWarningModalIsOpen, setAbandonGameWarningModalIsOpen] = React.useState(false)
    // const [newGameSettingsModalIsOpen, setNewGameSettingsModalIsOpen] = React.useState(false)


    const [question, setQuestion] = React.useState({
        topic: "",
        inputType: "",
        instruction: "",
        formatString: null,  // Change this to use Latex
        vars: [],
        missingVar: null,
    })

    
    
    
    
    // LAYOUT
    const height = useScreenHeight()
    const width = useScreenWidth()
    const  maxSquareSideLength = (height <= width) ? height : width

    
    
    
    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////
    function handleColumnClick(columnIndex) {
        let columnData = getColumnData(columnIndex, moveList)
        let lowestUnclaimedRow = columnData.indexOf("unclaimed")
        let lowestUnclaimedCell = lowestUnclaimedRow * 7 + columnIndex
        if (gameIsOver(gameStatus)) {
            console.log(`handleColumnClick() had NO EFFECT since game is already over!`)
            return 
        }
        if (lowestUnclaimedRow === -1) {
            console.log(`handleColumnClick() had NO EFFECT since column is full!`)
            return
        }

        let question = getQuestion(mathTopics, columnIndex)
        console.log(`QUESTION: ${JSON.stringify(question)}`)

        setOpenModal("question")
        setActiveCell(lowestUnclaimedCell)
        setQuestion({
            topic: 'combining',
            inputType: 'textField',
            instruction: null,
            formatString: 'a+b=c',  // Change this to use Latex
            vars: [1, 2, 3],
            missingVar: 2,      // index in the vars array of the term to leave blank. 
        })
    }


    function handleAnswerSubmit(answer) {
        const { vars, missingVar } = question

        // let answer = answer.trim whitespace and remove commas
        
        let answerIsCorrect = true // DEV only
        // let answerIsCorrect = answer === vars[missingVar]
        // console.log(`Answer submitted was ${(answer === vars[missingVar]) ? 'CORRECT' : 'WRONG'}`)


        let moveToAdd = (answerIsCorrect) ? activeCell : -1 // Check if answer is correct
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


    
    function openAbandonGameModal() {
        setOpenModal("abandonGame")
        
    }
    function openSettingsModal() {
        setMoveList([])
        setGameStatus('playerOnesTurn')
        setOpenModal("newGameSettings")
    }
    function handlePlayNowClick() {
        setMoveList([])
        setGameStatus('playerOnesTurn')
        setOpenModal("question")
        setActiveCell(null)
    }

    function handleUndoClick() {
        let shortenedMoveList = moveList.slice(0, -1)
        setMoveList(shortenedMoveList)
        setGameStatus(getGameStatus(shortenedMoveList))
        setOpenModal("none")
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
                        height:  maxSquareSideLength,
                        width:  maxSquareSideLength,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        <InGameMenu
                            handleNewGameClick={openAbandonGameModal}
                            handleAbandonGameClick={openSettingsModal}
                            handleUndoClick={handleUndoClick}
                        />

                        {/* <MathQuestionModal
                            modalState={(openModal === "question")}
                            handleAnswerSubmit={handleAnswerSubmit}
                             maxSquareSideLength={ maxSquareSideLength}
                        /> */}
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