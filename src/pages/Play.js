import React from 'react'
import {
    Link as RouterLink,
    useLocation,
} from "react-router-dom"

// MY UI components
import { GameBoard } from "../components/GameBoard";

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

    const [moveList, setMoveList] = React.useState([])
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')

    
    ///////////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////////

    function handleColumnClick(colNumber) {
        console.log(`handleColumnClick has been called with colNumber: ${colNumber} and currentTurnNumber: ${currentTurnNumber} `)

        let ml = moveList.slice()
        // let currentTurnStatus = copyOfHistory[currentTurnNumber];
        // let status = currentTurnStatus.gameStatus;
        // console.log(`Game Status before Handling Click : ${status}`)
        
        // Return Early w/o effect if ( gameAlreadyOver || clickedColumnFull )
        let gameIsOver = (status === 'playerOneWins' || status === 'playerTwoWins' || status === 'gameDrawn')
        let columnIsFull = (getColumnData(colNumber).length >= squaresPerCol)
        if (gameIsOver || columnIsFull) {
            console.log(`Returning Early from handleClick() since Game is already over OR column is full!`)
            return -1;
        }
        // console.log(`Calling lowestEmptySquareInCol with colStatus: ${colStatus} and colNumber: ${colNumber}`)
        let moveToAdd = lowestEmptySquareInCol(colStatus, colNumber);
        console.log(`lowestEmptySquareInCol found square id: ${moveToAdd}`)
        if (moveToAdd === -1) {
            console.log(`Clicked column is already full!`)
            return -1;
        }

        let updatedMoveList = currentTurnStatus.moveList.concat(moveToAdd);
        let updatedTurnNumber = updatedMoveList.length;
        let updatedLineStatusMap = getLineStatusMap(updatedMoveList);
        let updatedGameStatus = getGameStatus(updatedTurnNumber, updatedLineStatusMap)
        let newTurnStatus = {
            "turnNumber": updatedMoveList.length,
            "moveList": updatedMoveList,
            "boardStatus": getBoardStatus(updatedMoveList),
            "lineStatusMap": updatedLineStatusMap,
            "gameStatus": updatedGameStatus
        }

        console.log(`About to add newTurnStatus to the History array: `);
        logTurnStatusObject(newTurnStatus);

        setHistory(history.concat(newTurnStatus));
        setCurrentTurnNumber(++currentTurnNumber);

        console.log(`Done Handling Click. It is now Turn Number ${currentTurnNumber} and the Game Status is: ${newTurnStatus.gameStatus}`);   // 

        // This is where we Would find and make the Computer Move if in Play vs. Computer Mode
        return 0;
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
    function playerOneMoves(ml = moveList) {
        return ml.filter((move, turn) => turn % 2 === 0)
    }
    function playerTwoMoves(ml = moveList) {
        return ml.filter((move, turn) => turn % 2 === 1)
    }
    function removeSkippedTurns(moves) {
        return moves.filter((move) => move === -1)
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