import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY UI components
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";

// MY Logical components
import { lineToCellsMap, cellToLinesMap } from '../logic/maps'   
import { intersect, gameIsOver, playerOnesNumbers, playerTwosNumbers } from '../logic/helpers'


// MUI  components
import { Typography, Container, Box } from '@material-ui/core'
import theme from '../theme';


export default function Play(props) {
    // const location = useLocation()
    // const { playMode, questionType} = location.state
    const playMode = "human"
    const questionType = "multiplication"

    const [moveList, setMoveList] = React.useState([])  // An Array of integers ranging -1 thru 41 of indeterminate length
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')


    let currentTurnNumber = moveList.lenth
    
    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////

    function handleColumnHover(colNumber) {
        console.log(`You hovered over column number: ${colNumber}`)
        
        return 0;
    }

    function handleColumnClick(columnNumber) {
        let columnData = getColumnData(columnNumber)
        let columnIsFull = !columnData.includes("unclaimed")
        if (gameIsOver(gameStatus) || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1
        }
        let lowestUnclaimedCell = columnData.indexOf("unclaimed") * 7 + columnNumber
        
        // This is where the Math Question Pop Up determines whether or not the move is made. 
        
        
        let updatedMoveList = moveList.concat(lowestUnclaimedCell)
        let updatedGameStatus = getGameStatus(updatedMoveList)
        setMoveList(updatedMoveList)
        setGameStatus(updatedGameStatus)
        console.log(`updated GameStatus: ${updatedGameStatus}`)
        console.log(`YOU CLICKED COLUMN: ${columnNumber}`)

        
        // This is where we Would find and make the Computer Move if in Play vs. Computer Mode
        return 0;
    }
    function handleNewGameClick() {
        setMoveList([])
        setGameStatus('playerOnesTurn')
        console.log(`NEW GAME !!!`)
        return 0;
    }

    
    // Returns ENUM: 'playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw'
    // This function efficiently checks to see if the last move created a win for the player who made it.
    function getGameStatus(moveList) {
        let lastPlayerToMove = (moveList.length % 2 === 1) ? "playerOne" : "playerTwo"
        let lastPlayersNumbers = (lastPlayerToMove === "playerOne") ? playerOnesNumbers(moveList) : playerTwosNumbers(moveList) 
        let lastMoveMade = Number(lastPlayersNumbers.slice(-1) )
        let linesAffectedByLastMove = cellToLinesMap.get(lastMoveMade)
        for (let i = 0; i < linesAffectedByLastMove.length; i++) {
            let line = linesAffectedByLastMove[i]
            let cellsInLine = lineToCellsMap.get(line)
            // For added efficiency I could at this point remove the lastMoveMade from cells in line and in the next line look for intersections of length 3.
            if (intersect(cellsInLine, lastPlayersNumbers).length === 4) {
                return (lastPlayerToMove === 'playerOne') ? 'playerOneWins' : 'playerTwoWins'
            }
        }
        return (moveList.length % 2 === 0) ? 'playerOnesTurn' : 'playerTwosTurn'
    }

    




    function playerWhoGoesNext() {
        console.assert(!gameIsOver(gameStatus), "playerWhoGoesNext was called BUT the game is already over!")
        return (moveList.length % 2 === 0) ? 'playerOne' : 'playerTwo'
    }
    
    function columnIsFull(columnData) {
        return (!columnData.includes("unclaimed"))
    } 
    function getLowestUnclaimedCell(columnNumber, columnData) {
        return columnData.indexOf("unclaimed") * 7 + columnNumber
    }

    ///////////////////////////////////////////////////////
    // DATA FILTERS and CONVERTERS
    ///////////////////////////////////////////////////////

    function boardDataFromMoveList(moveList) {
        let boardData = Array(7).fill([])
        moveList.forEach((move, turn) => {
            if (move !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
                let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
                let columnIndex = move % 7
                let columnData = boardData[columnIndex]
                boardData[columnIndex] = columnData.concat(player)
            }
        })
        return boardData
    }

    // Filter a movelist to contain only numbers 
    function getColumnData(colNumber, ml = moveList) {
        let columnData = Array()
        ml.forEach((move, turn) => {
            if (move !== -1 && move % 7 === colNumber) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
                let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
                columnData = columnData.concat(player)
            }
        })
        while(columnData.length < 6) {
            columnData.push("unclaimed")
        }
        return columnData
    } 

    function nextPlayer( gs = gameStatus) {
        if (gs === "playerOneWins" || gs === "playerTwoWins" || gs === "gameOverDraw") {
            return "background"
        }
        else if (gs === "playerTwosTurn") {
            return "playerTwo"
        }
        else if (gs === "playerOnesTurn") {
            return "playerOne"
        }
        else {
            console.error(`Invalid game status`)
        }
        
        
    }

    // function handleUndoButtonClick() {
    //     setCurrentTurnNumber(--currentTurnNumber);
    // }

    function handleNewGameButtonClick() {
        setMoveList([])
        setGameStatus('playerOnesTurn')
        console.log(`Starting a NEW GAME ***********`);
    }
    
    return (
        <Container id='playPageContainer'
            maxWidth='lg' 
            disableGutters 
            sx={{ bgcolor: 'background',
                // height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>

            {/* ADD Math Question Popup */}

            <GameBoard 
                moveList={moveList}
                gameStatus={gameStatus}
                handleColumnClick={handleColumnClick} 
                handleColumnHover={handleColumnHover}
            />
            <InfoPanel gameStatus={gameStatus}
                playMode={playMode}
                questionType={questionType}
                orientation={props.orientation} 
                handleNewGameClick={handleNewGameClick}
            />

        </Container>

        

    );
}