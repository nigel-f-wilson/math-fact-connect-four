import React from 'react'

// MY UI components
import { GameBoard } from "../components/GameBoard";
import { InfoPanel } from "../components/InfoPanel";

// MY UI components
import { lineIdToSquareIdsMap, squareIdToLineIdsMap } from '../logic/maps'   

// MUI  components
import { Typography, Container, Box } from '@material-ui/core'
import theme from '../theme';


export default function Play(props) {
    // Game Constants
    const squaresPerCol = 6;
    const squaresPerRow = 7;
    let totalSquares = squaresPerCol * squaresPerRow;
    
    const location = useLocation()
    const { playMode, questionType} = location.state

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

    function handleColumnClick(colNumber) {
        console.log(`You clicked column number: ${colNumber}`)
        let ml = moveList.slice()
        let gs = gameStatus.slice()
        let columnData = getColumnData(colNumber)
        
        // Return Early w/o effect if ( gameAlreadyOver || clickedColumnFull )
        let gameIsOver = (gs === 'playerOneWins' || gs === 'playerTwoWins' || gs === 'gameDrawn')
        let columnIsFull = (columnData.length >= squaresPerCol)
        if (gameIsOver || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1;
        }
        
        let moveToAdd = columnData.length * 7 + colNumber  // AKA lowestEmptySquareInCol
        console.log(`Clicked Column: ${colNumber} -- found lowestEmptySquareInCol: ${moveToAdd}.`)

        let updatedMoveList = ml.concat(moveToAdd)
        // Not explicitly updating currentTurnNumber to see if it responds automatically to changes in moveList state.
        let updatedGameStatus = getGameStatus(updatedMoveList)
        setMoveList(updatedMoveList)
        setGameStatus(updatedGameStatus)
        // This is where we Would find and make the Computer Move if in Play vs. Computer Mode
        return 0;
    }

    function getGameStatus(moveList) {
        return (moveList.length % 2 === 0) ? 'playerOne' : 'playerTwo'
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

    function getColumnData(colNumber, ml = moveList) {
        let columnData = Array()
        ml.forEach((move, turn) => {
            if (move !== -1 && move % 7 === colNumber) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
                let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
                columnData = columnData.concat(player)
            }
        })
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

    function nextPlayer(ml = moveList, gs = gameStatus) {
        if (gs === "playerOneWins" || gs === "playerTwoWins" || gs === "draw") {
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

    // function handleNewGameButtonClick() {
    //     setHistory([statusOnTurnZero]);
    //     setCurrentTurnNumber(0);
    //     console.log(`Starting a NEW GAME ***********`);
    // }
    
    return (
        <Container maxWidth='sm' sx={{ bgcolor: 'background'}} disableGutters >
            <GameBoard 
                moveList={moveList}
            />
        </Container>

        

    );
}