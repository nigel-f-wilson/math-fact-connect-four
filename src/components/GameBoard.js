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
    let { moveList, handleColumnClick, gameStatus } = props 
    
    // Add state that updates each time the ml prop changes
    // Design it so that only the colum where the last move was made re-renders
    // This should make the peice-drop transition animation easier. 
    // boardDataFromMoveList as is duplicates a lot of work 
    // let boardData = boardDataFromMoveList(moveList)

    // console.log(`boardDataFromMoveList: ${boardData}`)

    let columnNumbers = [0,1,2,3,4,5,6]
    
    return (
        <Box id='max-height-box' sx={{ maxHeight: '90vh',  }} >
            <Box id='square-box-outter' sx={{ height: 0, overflow: 'hidden', pt: '100%', position: 'relative' }} >
                <Box id='square-box-inner' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex' }} >
                    {/* <Box id='columns' sx={{ display: 'flex' }} > */}
                    {columnNumbers.map(columnId => {
                        return (
                            <Column key={columnId} 
                                columnId={columnId}
                                data={columnDataFromMoveList(columnId, moveList)}
                                gameStatus={gameStatus}
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

function columnDataFromMoveList(columnId, moveList) {
    let columnData = new Array()
    moveList.forEach((squareId, turn) => {
        if (squareId !== -1 && squareId % 7 === columnId) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
            let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
            // let colIndex = squareId % 7
            // let rowIndex = Math.floor(squareId / 7)
            columnData.push(player)
            
        }
    })
    while (columnData.length < 6) {
        columnData.push("unclaimed")
    }
    return columnData
}


function Column(props) {
    const { columnId, data, handleColumnClick, gameStatus } = props

    let nextPlayer = (gameStatus) => {
        if (gameStatus === "playerOneWins" || gameStatus === "playerTwoWins" || gameStatus === "gameOverDraw") {
            return "background"
        }
        else if (gameStatus === "playerTwosTurn") {
            return "playerTwo"
        }
        else if (gameStatus === "playerOnesTurn") {
            return "playerOne"
        }
        else {
            console.error(`Invalid game status`)
        }


    }

    

    const [hoverRef, isHovered] = useHover()
    
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
    columnId: PropTypes.number.isRequired,
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

