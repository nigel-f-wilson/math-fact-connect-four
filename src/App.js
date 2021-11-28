import React from 'react'

// PAGES
import WelcomePage from "./pages/Welcome"
// import SettingsPage from "./pages/Settings"
// import PlayPage from "./pages/Play"
import InfoPage from "./pages/Info"
// MY components
import { InGameMenu } from "./modals/Menu";
import { GameBoard } from "./pages/GameBoard";
import { MathQuestionModal } from "./modals/MathQuestionModal";
// import { GameSettingsModal } from "./components/GameSettingsModal";

// Game Logic
import { generateQuestion, getCorrectAnswer } from './logic/questionGenerator'
import { gameIsOver, getColumnData, getGameStatus, playerOnesNumbers, playerTwosNumbers } from './logic/connectFourLogic'

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

    // GAME STATE
    const [moveList, setMoveList] = React.useState([])  // An Array of integers ranging -1 thru 41 of indeterminate length
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')  // Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [openModal, setOpenModal] = React.useState("none") // Enum: "none", "question", "abandonGame", "newGameSettings", 
    const [activeCell, setActiveCell] = React.useState(null) 

    const [question, setQuestion] = React.useState({
        type: "missingSumTwo",
        vars: [1, 2, 3]
    })

    
    // LAYOUT
    const height = useScreenHeight()
    const width = useScreenWidth()
    const  boardSideLength = (height <= width) ? height : width

    
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
        const topic = chooseRandomFromArray(mathTopics)
        let difficulty = pickDifficulty(columnIndex)
        // console.log(`Selected Topic "${topic}" and Difficulty level: "${difficulty}"`)
        let newQuestion = generateQuestion(topic, difficulty)
        console.log(`NEW QUESTION: ${JSON.stringify(newQuestion, null, 4)}`)
        setQuestion(newQuestion)
        setOpenModal("question")
        setActiveCell(lowestUnclaimedCell)

    }

    function handleAnswerSubmit(answerIsCorrect) {
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
        }, 1750)
        
        // if (opponent === "bot") {
        //     console.error(`IT IS THE BOT'S TURN BUT GETBOTMOVE HAS NOT BEEN DEFINED`)
        // }
    }

    function closeModal() {
        setOpenModal("none")
    }
    
    

    function pickTopic() {
        return mathTopics[(Math.random() * mathTopics.length)]
    }
    function pickDifficulty() {
        
        let questionsRightSoFar = -1

        if (gameStatus === "playerOnesTurn") {
            questionsRightSoFar = playerOnesNumbers(moveList).length
        }
        else if (gameStatus === "playerTwosTurn") {
            questionsRightSoFar = playerTwosNumbers(moveList).length
        }
        else {
            console.error(`pickDifficulty was called but the game is already over`);
        }

        if (questionsRightSoFar < 6) {
            return "easy"
        }
        else if (questionsRightSoFar < 12) {
            return "medium"
        }
        else if (questionsRightSoFar >= 12) {
            return "hard"
        }
        else {
            console.error(`Invalid number of question right so far: ${questionsRightSoFar}`);
        }
        
        return
    }
    function chooseRandomFromArray(array) {
        let randomIndex = Math.floor((Math.random() * array.length))
        return array[randomIndex]
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
                        // border: 'solid red 5px',
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
                    <Box id='play-page' sx={{
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
                        <MathQuestionModal
                            open={(openModal === "question")}
                            question={question}
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