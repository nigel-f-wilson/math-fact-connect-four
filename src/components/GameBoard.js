import React from 'react'

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'

export function GameBoard(props) {
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



function Column(props) {
    return (
        <Box sx={{ 
            bgcolor: 'background', 
            width: squarePercentage,
            height: '100%',
            display: 'flex',
            flexDirection: 'column-reverse'
            }} 
            
        >
            {/* {
                props.data.map(squareStatus => {
                    <Square status={squareStatus} />
                })
            } */}
            <Square status={props.data[0]} />
            <Square status={props.data[1]} />
            <Square status={props.data[2]} />
            <Square status={props.data[3]} />
            <Square status={props.data[4]} />
            <Square status={props.data[5]} />
            <Square transparent ></Square>


        </Box>
    );
}

function Square(props) {
    let bgcolor = props.transparent ? 'background' : 'board.main'
    let chipColor = props.status ? props.status : 'unclaimed'
    
    return (
        <Box sx={{ 
            bgcolor: bgcolor,
            height: squarePercentage,
            width: '100%',
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',

            }} 
        >
            <Chip color={chipColor} />

        </Box>
    );
}

// Having a Chip be a separate component with a lower Z-index than the Square
// should make adding a sliding transition animation easier. 
function Chip(props) {
    let bgcolor = `chip.${props.color}`

    return (
        <Box sx={{
            bgcolor: bgcolor,
            height: chipSizeRelativeToSquare,
            width: chipSizeRelativeToSquare,
            borderRadius: '50%'
        }}
        >


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