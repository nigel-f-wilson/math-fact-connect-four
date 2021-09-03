import React from 'react'
import PropTypes from 'prop-types'


// Custom Hooks
import { useHover } from "../hooks/useHover";

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'

export function GameBoard(props) {
    
    // Add state that updates each time the ml prop changes
    // Design it so that only the colum where the last move was made re-renders
    // This should make the peice-drop transition easier. 
    // boardDataFromMoveList as is duplicates a lot of work 
    let boardData = boardDataFromMoveList(moveList)
    function boardDataFromMoveList(moveList) {
        let boardData = Array(7).fill(Array(6).fill('unclaimed'))
        console.log(`moveList: ${moveList}`);



        moveList.forEach((squareId, turn) => {
            if (squareId !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
                let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
                let columnIndex = squareId % 7
                let rowIndex = Math.floor(squareId / 7)
                console.log(`squareId: ${squareId}`);
                console.log(`squareId % 7: ${squareId % 7}`);
                console.log(`columnIndex: ${columnIndex}`);
                console.log(`boardData: ${boardData}`);
                console.log(`columnData for col 1: ${boardData[1]}`);
                let columnData = boardData[columnIndex].slice()
                console.log(`columnData: ${columnData}`);
                boardData[columnIndex] = columnData.splice()
            }
        })
        return boardData
    }
    console.log(`boardDataFromMoveList: ${boardData}`)

    let columnNumbers = [0,1,2,3,4,5,6]
    
    return (
        <Box id='max-height-box' sx={{ maxHeight: '90vh',  }} >
            <Box id='square-box-outter' sx={{ height: 0, overflow: 'hidden', pt: '100%', position: 'relative' }} >
                <Box id='square-box-inner' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex' }} >
                    {/* <Box id='columns' sx={{ display: 'flex' }} > */}
                    {columnNumbers.map(colunmIndex => {
                        return (
                            <Column key={colunmIndex} 
                                num={colunmIndex} 
                                data={boardData[colunmIndex]} 
                                nextPlayer={nextPlayer}
                                handleColumnClick={handleColumnClick} 
                            />
                        )
                    })}
                    {/* </Box> */}
                </Box>
            </Box>
        </Box>
    )
    
}



function Column(props) {
    const { columnId, data, handleColumnClick, nextPlayer } = props
    
    const [hoverRef, isHovered] = useHover();
    
    return (
        <Box ref={hoverRef} onClick={() => handleColumnClick(columnId)}
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
            <Square chipColor={data[0]} />
            <Square chipColor={data[1]} />
            <Square chipColor={data[2]} />
            <Square chipColor={data[3]} />
            <Square chipColor={data[4]} />
            <Square chipColor={data[5]} />
            <Square transparent chipColor={isHovered ? nextPlayer : 'unclaimed'} > </Square>


        </Box>
    );
}
Column.propTypes = {
    num: PropTypes.number.isRequired, 
    data: PropTypes.arrayOf(PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed'])), 
    handleColumnClick: PropTypes.func, 
    nextPlayer: PropTypes.oneOf(['playerOne', 'playerTwo', 'gameOver'])
}

function Square(props) {
    let bgcolor = props.transparent ? 'background' : 'board.main'
    let chipColor = props.chipColor ? props.chipColor : 'unclaimed'
    
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

