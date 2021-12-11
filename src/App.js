import React from 'react'

// PAGES
// import WelcomePage from "./pages/Welcome"
// import SettingsPage from "./pages/Settings"
// import PlayPage from "./pages/Play"
// import InfoPage from "./pages/Info"
// MY components
import { InGameMenu } from "./modals/Menu";
import { GameBoard } from "./pages/GameBoard";
import { NewGameSettingsModal } from "./modals/NewGameSettingsModal";
import { MathQuestionModal } from "./modals/MathQuestionModal";
// import { GameSettingsModal } from "./components/GameSettingsModal";

// Game Logic
import { gameIsOver, 
    getColumnData, 
    getGameStatus, 
    nextPlayersMoves, 
    nextPlayerColor } from './logic/connectFourLogic'
import { testQuestion, generateQuestion } from './logic/questionGenerators/questionGenerator'
import { chooseRandomFromArray } from './logic/lowLevelHelpers';

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
    // const [mathTopics, setMathTopics] = React.useState(["combining", "multiplying"])  // An array of all types player wants
    const [mathTopics, setMathTopics] = React.useState(["multiplying"])  // An array of all types player wants

    // GAME STATE
    const [moveList, setMoveList] = React.useState([])  // An Array of integers ranging -1 thru 41 of indeterminate length
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')  // Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    // const [openModal, setOpenModal] = React.useState("none") // Enum: "none", "question", "abandonGame", "newGameSettings", 
    const [openModal, setOpenModal] = React.useState("newGameSettings") // Enum: "none", "question", "abandonGame", "newGameSettings", 
    const [activeCell, setActiveCell] = React.useState(null) 

    // QUESTION MODAL PROPS
    const [question, setQuestion] = React.useState(testQuestion())
    const [headerText, setHeaderText] = React.useState("")
    const waysToSayCorrect = [
        "Correct!",
        "Right!",
        "That's it!",
        "Good job!",
        "Very good!"
    ]

    // LAYOUT
    const height = useScreenHeight()
    const width = useScreenWidth()
    const boardSideLength = (height <= width) ? height : width

    
    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////
    function handleColumnClick(columnIndex) {
        if (gameIsOver(gameStatus)) {
            console.log(`handleColumnClick() had NO EFFECT since game is already over!`)
            return 
        }
        let columnData = getColumnData(columnIndex, moveList)
        let lowestUnclaimedRow = columnData.indexOf("unclaimed")
        if (lowestUnclaimedRow === -1) {
            console.log(`handleColumnClick() had NO EFFECT since column is full!`)
            return
        }
        let lowestUnclaimedCell = lowestUnclaimedRow * 7 + columnIndex
        openMathQuestionModal(lowestUnclaimedCell)
    }

    function openMathQuestionModal(activeCell) {
        const score = nextPlayersMoves(gameStatus, moveList).length

        // My first Promise     
        const newQuestion = generateQuestion(mathTopics, score).then(newQuestion => {
            console.log(`Opening Modal with Question --> ${JSON.stringify(newQuestion, null, 4)}`);
            setQuestion(newQuestion)
            setHeaderText(newQuestion.instructions)
            setOpenModal("question")
            setActiveCell(activeCell)
        })
    }
    
    function handleAnswerSubmit(playersAnswer) {
        const answerIsCorrect = (Number(playersAnswer.trim()) === question.correctAnswer)
        const answerFeedbackHeaderText = (answerIsCorrect ? chooseRandomFromArray(waysToSayCorrect) : `Nope. It was ${question.correctAnswer}.`)
        setHeaderText(answerFeedbackHeaderText)

        let moveToAdd = (answerIsCorrect) ? activeCell : -1
        let updatedMoveList = moveList.concat(moveToAdd)
        let updatedGameStatus = getGameStatus(updatedMoveList)
        console.log(`Adding ${moveToAdd} to the moveList. Game status: ${updatedGameStatus}`);
        setTimeout(() => {
            setOpenModal("none")
        }, 1500);
        setTimeout(() => {
            setMoveList(updatedMoveList)
            setGameStatus(updatedGameStatus)
            setActiveCell(null)
        }, 1800)
        
        // if (opponent === "bot") {
        //     console.error(`IT IS THE BOT'S TURN BUT GETBOTMOVE HAS NOT BEEN DEFINED`)
        // }
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

    
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Box id='root'
                    sx={{
                        bgcolor: 'background',
                        height: '100vh',
                        width: '100vw',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    {/* <WelcomePage /> */}
                    {/* <PlayPage /> */}
                    {/* <InfoPage /> */}
                    <Box id='play-page' 
                        sx={{
                            height:  boardSideLength,
                            width:  boardSideLength,
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

                        <NewGameSettingsModal 
                            open={(openModal === "newGameSettingsModal")}
                            handleStartGameClick={startGame}
                            boardSideLength={boardSideLength}

                        />

                        <MathQuestionModal
                            open={(openModal === "question")}
                            nextPlayerColor={nextPlayerColor(gameStatus)}
                            gameStatus={gameStatus}
                            question={question}
                            headerText={headerText}
                            handleAnswerSubmit={handleAnswerSubmit}
                            boardSideLength={boardSideLength}
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