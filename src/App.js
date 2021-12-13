import React from 'react'

// MY components
import { GameBoard } from "./GameBoard";
import { WelcomeModal } from "./modals/WelcomeModal";
import { InGameMenu } from "./modals/InGameMenu";
import { SettingsModal } from "./modals/SettingsModal";
import { MathQuestionModal } from "./modals/MathQuestionModal";

// Game Logic
import { gameIsOver, 
    getLowestUnclaimedCell,
    getGameStatus, 
    nextPlayersMoves, 
    nextPlayerColor } from './logic/connectFourLogic'
import { testQuestion, generateQuestion } from './logic/questionGenerators/questionGenerator'
import { chooseRandomFromArray } from './logic/lowLevelHelpers'
import { getBotMove } from "./logic/getBotMove";

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
    const [mathTopics, setMathTopics] = React.useState({
        combine: true,
        multiply: false,
    })
    const [difficultyMode, setDifficultyMode] = React.useState("increasing")  // One of "easy" "medium" "hard" "increasing"
    // I chose to use three separate useState calls rather than one settings object with these same three keys because this way I avoid having to use spread syntax to keep all other state as-is when updating one piece in the settings modal.  This may be misguided.

    // GAME STATE
    const [moveList, setMoveList] = React.useState([])  // An Array of integers ranging -1 thru 41 of indeterminate length
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')  // Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [openModal, setOpenModal] = React.useState("welcome") // Enum: "none", "question", "settings", "welcome", "inGameMenu"
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
        let lowestUnclaimedCell = getLowestUnclaimedCell(columnIndex, moveList)
        if (lowestUnclaimedCell === -1) {
            console.log(`handleColumnClick() had NO EFFECT since column is full!`)
            return
        }
        openMathQuestionModal(lowestUnclaimedCell)
    }

    function openMathQuestionModal(activeCell) {
        const score = nextPlayersMoves(gameStatus, moveList).length
        let difficulty = (difficultyMode === "increasing") ? determineDifficulty(score) : difficultyMode

        const mathTopicsArray = Object.entries(mathTopics).filter(entry => entry[1]).map(entry => entry[0])
        console.log(`Math Topics Array: ${mathTopicsArray}`);
        let topic = chooseRandomFromArray(mathTopicsArray)

        // My first Promise     
        generateQuestion(topic, difficulty).then(newQuestion => {
            // console.log(`Opening Modal with Question --> ${JSON.stringify(newQuestion, null, 4)}`);
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
        }, 1850)

        // Handle Bot'sTurn
        if (opponent === "bot" && !gameIsOver(updatedGameStatus)) {
            let botMove = getBotMove(updatedMoveList)
            let moveListAfterBot = updatedMoveList.concat(botMove)
            let gameStatusAfterBot = getGameStatus(moveListAfterBot)
            console.log(`Adding Bot Move: ${botMove} to the moveList. Game status: ${gameStatusAfterBot}`);
            setTimeout(() => {
                setMoveList(moveListAfterBot)
                setGameStatus(gameStatusAfterBot)
            }, 2200)
        }
        
    }

    function toggleCombine() {
        setMathTopics(prev => { return { ...prev, combine: !prev.combine } })
    }
    function toggleMultiply() {
        setMathTopics(prev => { return { ...prev, multiply: !prev.multiply } })
    }
    function selectOpponent(opponent) {
        setOpponent(opponent)
    }
    function selectDifficulty(difficulty) {
        setDifficultyMode(difficulty)
    }

    function determineDifficulty(score) {
        console.log(`determineDifficulty called with ${score} `);
        if (score < 7) {
            return "easy"
        }
        else if (score < 14) {
            return "medium"
        }
        else if (score >= 14) {
            return "hard"
        }
        else {
            console.error(`Invalid number of question right so far: ${score}`);
            return "error"
        }
    }
 
    function startNewGame(mathTopics, difficultyMode, opponent ) {
        console.log(`STARTING NEW GAME with ...`);
        console.log(`opponent: "${opponent}"`);
        console.log(`mathTopics: "${JSON.stringify(mathTopics, null, 4)}", `);
        console.log(`difficultyMode: "${difficultyMode}"`);

        setMathTopics(mathTopics)
        setDifficultyMode(difficultyMode)
        setMoveList([])
        setGameStatus('playerOnesTurn')
        setOpenModal("none")
        setActiveCell(null)
    }
    function cancelNewGame() {
        setOpenModal("none")
    }

    function handleUndoClick() {
        let shortenedMoveList = moveList.slice(0, -1)
        setMoveList(shortenedMoveList)
        setGameStatus(getGameStatus(shortenedMoveList))
        setOpenModal("none")
    }

    function openSettingsModal() {
        setOpenModal("settings")
    }
    function handleNewGameClick() {
        setOpenModal("settings")
    }
    function openInGameMenu() {
        setOpenModal("menu")
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

                        <WelcomeModal
                            open={(openModal === "welcome")}
                            openSettingsModal={openSettingsModal}
                            boardSideLength={boardSideLength}
                        />

                        <InGameMenu
                            open={(openModal === "menu")}
                            openSettingsModal={openSettingsModal}
                            openInGameMenu={openInGameMenu}
                            handleNewGameClick={handleNewGameClick}
                            handleUndoClick={handleUndoClick}
                        />

                        <SettingsModal 
                            open={(openModal === "settings")}
                            startNewGame={startNewGame}
                            cancelNewGame={cancelNewGame}
                            boardSideLength={boardSideLength}

                            opponent={opponent}
                            mathTopics={mathTopics}
                            difficultyMode={difficultyMode}

                            toggleCombine={toggleCombine}
                            toggleMultiply={toggleMultiply}
                            selectOpponent={selectOpponent}
                            selectDifficulty={selectDifficulty}

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