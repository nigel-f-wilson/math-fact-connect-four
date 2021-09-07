import React from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

// MY UI components
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";

// MY UI components
import { lineToCellsMap, cellToLinesMap } from '../logic/maps'   

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
        if (gameIsOver() || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1
        }
        // let lowestUnclaimedCell = getLowestUnclaimedCell(columnNumber, columnData)
        let lowestUnclaimedCell = columnData.indexOf("unclaimed") * 7 + columnNumber
        console.log(`Clicked Column: ${columnNumber} -- found lowestEmptySquareInCol: ${lowestUnclaimedCell}.`)
        let updatedMoveList = moveList.concat(lowestUnclaimedCell)
        let updatedGameStatus = getGameStatus(updatedMoveList)
        setMoveList(updatedMoveList)
        setGameStatus(updatedGameStatus)
        console.log(`updated GameStatus: ${updatedGameStatus}`)
        
        // This is where we Would find and make the Computer Move if in Play vs. Computer Mode
        return 0;
    }

    
    // Returns ENUM: 'playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw'
    // This function 
    function getGameStatus(moveList) {
        let lastPlayerToMove = (moveList.length % 2 === 1) ? "playerOne" : "playerTwo"
        let lastPlayersNumbers = (lastPlayerToMove === "playerOne") ? playerOnesNumbers(moveList) : playerTwosNumbers(moveList) 
        let lastMoveMade = lastPlayersNumbers.slice(-1) 
        // console.log(`lastPlayersNumbers: ${lastPlayersNumbers}`)
        // console.log(`lastMoveMade: ${lastMoveMade}`)

        // console.log(`lineIdToSquareIdsMap: ${lineIdToSquareIdsMap}`)
        // console.log([...lineIdToSquareIdsMap.entries()])

        // console.log(`squareIdToLineIdsMap: ${squareIdToLineIdsMap}`)
        // console.log([...squareIdToLineIdsMap.entries()])
        
        // let lineIdsToCheck = squareIdToLineIdsMap.get(lastMoveMade)
        // console.log(`lineIdsToCheck: ${lineIdsToCheck}`)


        
        return (moveList.length % 2 === 0) ? 'playerOne' : 'playerTwo'
    }


    function lookForHorizontalWins(params) {
        
        
        alert("Found a Horizontal Win")
    }
    function lookForVerticalWins(params) {

    } 
    function lookForHorizontalWins(params) {

    } 
    function lookForHorizontalWins(params) {

    }
    function playerOnesNumbers(moveList) {
        return moveList.filter((cell, turn) => turn % 2 === 0).filter(cell => cell !== -1)
    }
    function playerTwosNumbers(moveList) {
        return moveList.filter((cell, turn) => turn % 2 === 1).filter(cell => cell !== -1)
    }




    function playerWhoGoesNext() {
        console.assert(!gameIsOver(), "playerWhoGoesNext was called BUT the game is already over!")
        return (moveList.length % 2 === 0) ? 'playerOne' : 'playerTwo'
    }
    function gameIsOver() {
        return (gameStatus === 'playerOneWins' || gameStatus === 'playerTwoWins' || gameStatus === 'gameDrawn')
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

    
    // Higher Order functions call both of these first because these can only work with a raw moveList, pre-removal of -1's
    function playerOnesMoves(ml = moveList) {
        return ml.filter((move, turn) => turn % 2 === 0)
    }
    function playerTwosMoves(ml = moveList) {
        return ml.filter((move, turn) => turn % 2 === 1)
    }
    function removeSkippedTurns(moves) {
        return moves.filter((move) => move === -1)
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
            maxWidth='sm' 
            disableGutters 
            sx={{ bgcolor: 'background',
                // height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
            <GameBoard 
                moveList={moveList}
                gameStatus={gameStatus}
                handleColumnClick={handleColumnClick} 
                handleColumnHover={handleColumnHover}
            />
            <InfoPanel orientation={props.orientation} />

        </Container>

        

    );
}