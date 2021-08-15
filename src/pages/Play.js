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
    
    return (
        <Container maxWidth='sm' sx={{ bgcolor: 'background'}} disableGutters >
            <GameBoard 
                moveList={moveList}
            />
        </Container>

        

    );
}