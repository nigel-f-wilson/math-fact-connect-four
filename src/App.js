import React from 'react'

// PAGES
import WelcomePage from "./pages/Welcome"
// import SettingsPage from "./pages/Settings"
// import PlayPage from "./pages/Play"
import InfoPage from "./pages/Info"
// MY components
import { InGameMenu, AccountMenu } from "./modals/Menu";
import { GameBoard } from "./pages/GameBoard";
import { MathQuestionModal } from "./modals/MathQuestionModal";
// import { GameSettingsModal } from "./components/GameSettingsModal";

// Game Logic
import { gameIsOver, getColumnData, getGameStatus } from './logic/connectFourLogic'
import { generateQuestion, getCorrectAnswer } from './logic/questionGenerator'

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
        console.log(`Handle Answer submit adding ${moveToAdd} to the moveList`);
        setTimeout(() => {
            setOpenModal("none")
        }, 2000);
        setTimeout(() => {
            let updatedMoveList = moveList.concat(moveToAdd)
            let updatedGameStatus = getGameStatus(updatedMoveList)
            setMoveList(updatedMoveList)
            setGameStatus(updatedGameStatus)
            setActiveCell(null)
            setOpenModal("none")

        }, 4000)
        
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
    function pickDifficulty(columnIndex) {  // Harder questions near the center of the board.
        if (columnIndex < 4) {
            return columnIndex
        }
        else if (columnIndex === 4) {
            return 2
        }
        else if (columnIndex === 5) {
            return 1
        }
        else if (columnIndex === 6) {
            return 0
        } else {
            return "error"
        }
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