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

let rowNumbers = [0, 1, 2, 3, 4, 5]
let columnNumbers = [0, 1, 2, 3, 4, 5, 6]



export function GameBoard(props) {
    let { moveList, handleColumnClick, gameStatus } = props 
    
    // Add state that updates each time the ml prop changes
    // Design it so that only the colum where the last move was made re-renders
    // This should make the peice-drop transition animation easier. 
    // boardDataFromMoveList as is duplicates a lot of work 
    // let boardData = boardDataFromMoveList(moveList)

    // console.log(`boardDataFromMoveList: ${boardData}`)

    
    return (
        <Box id='max-height-box' sx={{ maxHeight: '90vh' }} >
            <Box id='square-box-outter' sx={{ height: 0, overflow: 'hidden', pt: '100%', position: 'relative' }} >
                <Box id='square-box-inner' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex' }} >
                    {/* <Box id='columns' sx={{ display: 'flex' }} > */}
                    {columnNumbers.map(columnId => {
                        return (
                            <Column key={columnId} 
                                columnId={columnId}
                                data={columnChipColorsFromMoveList(columnId, moveList)}
                                lastMoveWasMadeHere={columnWhereLastMoveWasMade(moveList) === columnId}
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

function columnChipColorsFromMoveList(columnId, moveList) {
    let columnChipColors = new Array()
    moveList.forEach((squareId, turn) => {
        if (squareId !== -1 && squareId % 7 === columnId) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
            let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
            columnChipColors.push(player)
        }
    })
    // while (columnData.length < 6) {
    //     columnData.push("unclaimed")
    // }
    return columnChipColors
}
function columnWhereLastMoveWasMade(moveList) {
    // let mostRecentMoveWasHere = 

    let lastMove = moveList[moveList.length - 1] 
    let columnId = lastMove % 7
    return columnId
}


function Column(props) {
    const { columnId, data, lastMoveWasMadeHere, handleColumnClick, gameStatus } = props

    console.log(`COLUMN ${columnId} CHIP COLORS: ${chipColors} LAST MOVE WAS HERE: ${lastMoveWasMadeHere}`)
    
    let nextPlayer = gameIsOver(gameStatus) ? "background" : (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"

    const [hoverRef, isHovered] = useHover()
    
    return (
        <Box id="column" ref={hoverRef} onClick={() => handleColumnClick(columnId)}
            sx={{ 
                bgcolor: 'background', 
                width: squarePercentage,
                height: '100%',
                // display: 'flex',
                // flexDirection: 'column-reverse',
                position: 'relative',
                
            }} 
        >
            <Box id="chipContainer" 
                sx={{
                    // bgcolor: 'background',
                    bgcolor: 'primary.main',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // zIndex: 
                }}
            >
                {/* <Slide enterOnMount={true} direction="down" in={true} >
                    <Chip color={data[0]} />  
                </Slide> */}
                <Chip id={columnId + 0} color={data[0]} />
                <Chip id={columnId + 1} color={data[1]} />
                <Chip id={columnId + 2} color={data[2]} />
                <Chip id={columnId + 3} color={data[3]} />
                <Chip id={columnId + 4} color={data[4]} />
                <Chip id={columnId + 5} color={data[5]} />
                <Chip id={columnId + 6} color={data[6]} />
                <Chip id={columnId + 7} transparent chip={isHovered ? nextPlayer : 'background'} > </Chip>
            </Box> 


            <ColumnOfSquaresWithHoles />

                {/* <Square chipColor={data[0]} />
                <Square chipColor={data[1]} />
                <Square chipColor={data[2]} />
                <Square chipColor={data[3]} />
                <Square chipColor={data[4]} />
                <Square chipColor={data[5]} />
                <Square transparent chipColor={isHovered ? nextPlayer : 'background'} > </Square> */}

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

function ColumnOfSquaresWithHoles(props) {
    return (
        <Box id="columnOfSquaresWithHoles"
            sx={{
                bgcolor: 'background',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column-reverse',
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            {rowNumbers.map((item, index) => {
                return (
                    <Box id="square"
                        key={index}
                        sx={{
                            // bgcolor default transparent,
                            overflow: 'hidden',
                            width: '100%',
                            height: squarePercentage,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box id="hole"
                            sx={{
                                boxShadow: "0 0 0 99px #0039cb",
                                // boxShadow: "0 0 0 9999px rgba(0, 0, 'board.main', 1)",
                                border: 'solid red 1px',
                                borderRadius: '50%',
                                bgcolor: 'transparent',
                                width: chipSizeRelativeToSquare,
                                height: chipSizeRelativeToSquare,
                            }}
                        >

                        </Box>
                    </Box>
                )
            })}

        </Box>
    )
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
            {/* <Chip color={chipColor} /> */}
            {/* <SlidingChip color={chipColor} /> */}

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

function Chip(props) {
    let bgcolor = `chip.${props.color}`

    return (
        <Slide enterOnMount={false} direction="down" in={true} >
            <Box sx={{
                bgcolor: bgcolor,
                height: chipSizeRelativeToSquare,
                width: chipSizeRelativeToSquare,
                borderRadius: '50%'
            }}
            >


            </Box>
        </Slide>
        
    )
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