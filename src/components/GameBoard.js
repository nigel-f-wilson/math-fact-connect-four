import React from 'react'

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'

    // const moveList = props.moveList // An Array of integers ranging -1 thru 41 of indeterminate length
    const moveList = [-1, 1,2,3,4,5,-1,-1,6,-1,8,9,-1,10,-1,11,-1,12] // Testing Only
    
    let boardData = boardDataFromMoveList(moveList)
    
    return (
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '375px' }} >
                <Column data={boardData[0]} />
                <Column data={boardData[1]} />
                <Column data={boardData[2]} />
                <Column data={boardData[3]} />
                <Column data={boardData[4]} />
                <Column data={boardData[5]} />
                <Column data={boardData[6]} />
            </Box>
    );
}


export default function GameBoard() {

            width: squarePercentage,
            height: '100%',
    return (
        <Box sx={{ bgcolor: 'board.main', mt: 4, pt: '100%', width: '100%' }} >
            height: squarePercentage,
            width: '100%',
            height: chipSizeRelativeToSquare,
            width: chipSizeRelativeToSquare,

        
        </Box>
    );
}

function boardDataFromMoveList(moveList) {
    let boardData = Array(7).fill([])
    moveList.forEach((squareId, turn) => {
        if (squareId !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
            let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
            let columnIndex = squareId % 7
            let columnData = boardData[columnIndex]
            boardData[columnIndex] = columnData.concat(player)
        }
    })
    return boardData
}