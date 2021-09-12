import React from 'react'
import PropTypes from 'prop-types'

// Logic
import { gameIsOver } from '../logic/helpers'

// Custom Hooks
import { useHover } from "../hooks/useHover";

// MUI  components
import { Box, Switch, Paper, Slide, FormControlLabel } from '@material-ui/core'

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

    let nextPlayer = gameIsOver(gameStatus) ? "background" : (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"

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
            
            <Square chipColor={data[0]} />
            <Square chipColor={data[1]} />
            <Square chipColor={data[2]} />
            <Square chipColor={data[3]} />
            <Square chipColor={data[4]} />
            <Square chipColor={data[5]} />
            <Square transparent chipColor={isHovered ? nextPlayer : 'background'} > </Square>
            
            {/* <SlidingChipContainer chipColor={nextPlayer} >
                
            </SlidingChipContainer> */}


        </Box>
    );
}
Column.propTypes = {
    columnId: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed'])), 
    handleColumnClick: PropTypes.func, 
    gameStatus: PropTypes.oneOf(['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw'])
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
function SlidingChipContainer(props) {
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
function SlidingChip(props) {
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

const icon = (
    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
        <Box component="svg" sx={{ width: 100, height: 100 }}>
            <Box
                component="polygon"
                sx={{
                    fill: (theme) => theme.palette.common.white,
                    stroke: (theme) => theme.palette.divider,
                    strokeWidth: 1,
                }}
                points="0,100 50,00, 100,100"
            />
        </Box>
    </Paper>
);

function SimpleSlide() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Box sx={{ height: 180 }}>
            <Box sx={{ width: `calc(100px + 16px)` }}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show"
                />
                <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                    {icon}
                </Slide>
            </Box>
        </Box>
    );
}

function SlideFromContainer() {
    const [checked, setChecked] = React.useState(false);
    const containerRef = React.useRef(null);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Box
            sx={{
                height: 180,
                width: 240,
                display: 'flex',
                padding: 2,
                borderRadius: 1,
                bgcolor: (theme) =>
                    theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
                overflow: 'hidden',
            }}
            ref={containerRef}
        >
            <Box sx={{ width: 200 }}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show from target"
                />
                <Slide direction="up" in={checked} container={containerRef.current}>
                    {icon}
                </Slide>
            </Box>
        </Box>
    );
}