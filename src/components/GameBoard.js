import React from 'react'

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'

export function GameBoard(props) {
    let {moveList, handleColumnClick} = props 
    // moveList = [-1, 1,2,3,4,5,-1,-1,6,-1,8,9,-1,10,-1,11,-1,12] // Testing Only
    
    let boardData = boardDataFromMoveList(moveList)
    console.log(`boardDataFromMoveList: ${boardData}`);
    
    return (
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '375px' }} >
                <Column num={0} data={boardData[0]} handleColumnClick={handleColumnClick} />
                <Column num={1} data={boardData[1]} handleColumnClick={handleColumnClick} />
                <Column num={2} data={boardData[2]} handleColumnClick={handleColumnClick} />
                <Column num={3} data={boardData[3]} handleColumnClick={handleColumnClick} />
                <Column num={4} data={boardData[4]} handleColumnClick={handleColumnClick} />
                <Column num={5} data={boardData[5]} handleColumnClick={handleColumnClick} />
                <Column num={6} data={boardData[6]} handleColumnClick={handleColumnClick} />
            </Box>
    );
}



function Column(props) {
    const { num, data, handleColumnClick } = props
    return (
        <Box onClick={num => handleColumnClick(num)}
            sx={{ 
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
            <Square status={data[0]} />
            <Square status={data[1]} />
            <Square status={data[2]} />
            <Square status={data[3]} />
            <Square status={data[4]} />
            <Square status={data[5]} />
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
    )



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
    let boardData = Array(7).fill(Array())
    moveList.forEach((squareId, turn) => {
        if (squareId !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
            let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
            let columnIndex = squareId % 7
            console.log(`columnIndex: ${columnIndex}`);

            // let columnData = Array.from(boardData[columnIndex])
            // console.log(`columnData: ${columnData}`);

            let columnData = boardData[columnIndex].slice()
            console.log(`columnData: ${columnData}`);

            console.log(`typeof(columnData): ${typeof(columnData)}`);
            boardData[columnIndex] = columnData.concat(player)
        }
    })
    return boardData
}