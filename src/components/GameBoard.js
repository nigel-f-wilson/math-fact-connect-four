import React from 'react'
import PropTypes from 'prop-types'

// Logic
import { gameIsOver } from '../logic/helpers'

// Custom Hooks
import { useHover } from "../hooks/useHover";
import { useScreenOrientation } from "../hooks/useScreenOrientaton"
import { useScreenWidth } from "../hooks/useScreenWidth"
import { useScreenHeight } from "../hooks/useScreenHeight"

// MUI  components
import { Box, Container, Switch, Paper, Slide, FormControlLabel } from '@material-ui/core'

// Style & Layout Constants
const oneSixth = '16.666%'
const squarePercentage = '14.287%'
const rowHeightPercentage = '16.665%'
const heightOfSixSquares = '85.714%'

const chipSizeRelativeToSquare = '84%'

let rowNumbers = [0, 1, 2, 3, 4, 5]
let columnNumbers = [0, 1, 2, 3, 4, 5, 6]

export function GameBoard(props) {
    const { moveList, handleColumnClick, gameStatus } = props
    
    const orientation = useScreenOrientation()
    const height = useScreenHeight()
    const width = useScreenWidth()
    const squareSideLength = (height <= width) ? height * 0.8 : width * 0.8

    // let boardChipColors = getBoardDataFromMoveList(moveList)  // board data is an array of 7 arrays of varying length. 
    let lastChipDropped = getLastChipDropped(moveList)  // id of Chip. May want to change this to column id. 


    // console.log(`Rendering Board with data: ${boardData}`)
    console.log(`Last Chip dropped: ${lastChipDropped}`)

    function getColumnChipColors(columnIndex) {
        let chipColors = boardChipColors().filter((player, cellId) => cellId % 7 === columnIndex)
        console.log(`CHIP COLORS for Column ${columnIndex}: ${chipColors}`)
        return chipColors
    }
    function boardChipColors() {
        let chipColors = new Array(42).fill('unclaimed')
        moveList.forEach((cellId, turnNumber) => {
            if (cellId !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
                let player = (turnNumber % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
                chipColors[cellId] = player
            }
        })
        // console.log(`Board Data: ${chipColors}`)
        return chipColors
    }
    
    return (
        <Container id="gameBoard"
            disableGutters
            sx={{
                position: 'relative',
                height: squareSideLength,
                width: squareSideLength,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}
        >
            {columnNumbers.map((columnIndex) => {
                let chipColors = getColumnChipColors(columnIndex)
                console.log(`Column Chip Colors for column ${columnIndex}: ${chipColors}`)
                return (
                    <Column 
                        key={columnIndex}
                        index={columnIndex}
                        chipColors={chipColors}
                        lastMoveWasHere={lastChipDropped % 7 === columnIndex}
                        nextPlayerColor={nextPlayerColor(gameStatus)}
                        handleColumnClick={handleColumnClick}
                    />
                )
            })}

                <Box id='borderContainer' 
function Chip(props) {
    const { id, color, transition, } = props
    let claimed = (color !== "unclaimed")
    let bgcolor = `chip.${color}`

    return (
        <Slide direction="down" in={claimed} enterOnMount={false} >
            <Box id="transparentSquareFrame"
                sx={{
                    // overflow: 'hidden',
                    // bgcolor: '#FFF',

                    width: '100%',
                    height: rowHeightPercentage,
                    // height: squarePercentage,
                    zIndex: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box id="hole"
                    sx={{
                        borderRadius: '50%',
                        bgcolor: bgcolor,
                        width: chipSizeRelativeToSquare,
                        height: chipSizeRelativeToSquare,
                    }}
                />
            </Box>
        </Slide>

    )
}

function Column(props) {
    const { index, chipColors, lastMoveWasHere, nextPlayerColor, handleColumnClick } = props
    // const [hoverRef, isHovered] = useHover()
    // console.log(`You ${isHovered ? "ARE" : "are NOT"} hovering on column: ${columnId}`)

    return (
        <Box id="column" 
            // ref={hoverRef} 
            onClick={() => handleColumnClick(index)}
            sx={{
                // border: 'solid red 1px',
                position: 'relative',
                // bgcolor: 'primary.main',
                width: squarePercentage,
                height: '100%',
                zIndex: 9,
                '&:hover #hoverChip': {
                    // backgroundColor: `chip.playerOne`,
                    backgroundColor: `chip.${nextPlayerColor}`,
                },
            }}
        >
            <Box id="hoverChipContainer" 
                sx={{
                    // bgcolor: 'primary.main',
                    width: '100%',
                    height: squarePercentage,
                    zIndex: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box id="hoverChip"
                    sx={{
                        bgcolor: 'background',
                        width: chipSizeRelativeToSquare,
                        height: chipSizeRelativeToSquare,
                        borderRadius: '50%',
                        zIndex: 8,
                        
                        
                    }}
                />
            </Box>
            <Box id="chipContainer"
                sx={{
                    bgcolor: 'primary.main',
                    width: '100%',
                    // height: 'calc(6/7*100%)',
                    height: '100%',
                    // zIndex: 7,
                    // display: 'flex',
                    // flexDirection: 'column-reverse',
                    // alignItems: 'center',
                    // justifyContent: 'flex-start',
                    position: 'absolute',
                    top: squarePercentage,
                    bgcolor: 'transparent',
                    width: '100%',
                    height: heightOfSixSquares,
                    zIndex: 8,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
            >
                {chipColors.map((color,index) => {
                    return <Chip
                        key={index}
                        id={index}
                        color={color}
                        transition={false}
                    />
                })}
            </Box>
            {/* <SlidingChipContainer 
                slideLast={true}                ////  Currently this will animate the last chip in each column. Easy to fix using lastMoveMade in Play 
                chipColors={chipColors}
            /> */}
            <ColumnOfSquaresWithHoles />

        </Box>
    );
}
Column.propTypes = {
    index: PropTypes.number.isRequired,
    nextPlayerColor: PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed']),
    handleColumnClick: PropTypes.func,
}

function SlidingChipContainer(props) {
    const { slideLast, chipColors } = props
    
    return (
        <Box id="slidingChipContainer"
            sx={{
                // bgcolor: 'primary.main',
                position: 'absolute',
                width: '100%',
                height: heightOfSixSquares,
                zIndex: 7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {chipColors.map(color => {
                return <Chip id
                    color={color}
                    transition={false}
                    // transition={true}
                    // transition={id === }
                />
                
            }) }
        </Box>
    )
}


function getLastChipDropped(moveList) {
    let ml = moveList.slice()
    let lastCellId
    do {
        lastCellId = ml.pop()
    } while ( lastCellId === -1 )
    return lastCellId
}


function nextPlayerColor(gameStatus) {
    return gameIsOver(gameStatus) ? "unclaimed" : (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"
}




const icon = (
    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
        {/* <Box component="svg" sx={{ width: 100, height: 100 }}>
            <Box
                component="polygon"
                sx={{
                    fill: (theme) => theme.palette.common.white,
                    stroke: (theme) => theme.palette.divider,
                    strokeWidth: 1,
                }}
                points="0,100 50,00, 100,100"
            />
        </Box> */}
        <Chip color="playerOne" />
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
                <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
                    {icon}
                </Slide>
            </Box>
        </Box>
    );
}

function SlideFromContainer() {
    const [chipData, setChipData] = React.useState(false);

    const [checked, setChecked] = React.useState(false);
    const containerRef = React.useRef(null);

    const handleChange = () => {
        setChecked((prev) => !prev)
        // setChipData
    };

    return (
        <Box
            sx={{
                border: 'solid red 2px',
                height: '100%',
                width: squarePercentage,
                display: 'flex',
                padding: 2,
                borderRadius: 1,
                bgcolor: (theme) =>
                    theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
                overflow: 'hidden',
                zIndex: 9999
            }}
            onClick={handleChange}
            ref={containerRef}
        >
            <Box sx={{ width: 200 }}>
                {/* <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show from target"
                /> */}
                <Slide direction="down" in={checked} container={containerRef.current} mountOnEnter >
                    {icon}
                </Slide>
            </Box>
        </Box>
    );
}



function ColumnsWithHoverAndClickHandler(props) {
    const { handleColumnClick, gameStatus } = props
    let nextPlayerColor = gameIsOver(gameStatus) ? "background" : (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"

    return (
        <Box id="columnContainer"
            sx={{
                // bgcolor: 'primary.main',
                width: '100%',
                height: '100%',
                display: 'flex',
            }}
        >
            {columnNumbers.map((item, index) => {
                return (
                    <Column key={index} id="column" columnId={index} nextPlayerColor={nextPlayerColor} handleColumnClick={handleColumnClick} />
                )
            })}

        </Box>
    );
}
ColumnsWithHoverAndClickHandler.propTypes = {
    handleColumnClick: PropTypes.func,
    gameStatus: PropTypes.oneOf(['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw'])
}

function ColumnOfSquaresWithHoles(props) {
    return (
        <Box id="columnOfSquares"
            sx={{
                position: 'absolute',
                top: squarePercentage,
                bgcolor: 'transparent',
                width: '100%',
                height: heightOfSixSquares,
                zIndex: 8,
                display: 'flex',
                flexDirection: 'column-reverse',
                
            }}
        >
            {rowNumbers.map((item, index) => {
                return (<SquareWithHole key={index} />)
            })}
        </Box>
    )
}

function SquareWithHole(props) {
    return (
        <Box id="squareWithHole"
            key={props.index}
            sx={{
                overflow: 'hidden',
                width: '100%',
                height: oneSixth,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box id="hole"
                sx={{
                    boxShadow: "0 0 0 99px #0039cb",
                    borderRadius: '50%',
                    bgcolor: 'transparent',
                    width: chipSizeRelativeToSquare,
                    height: chipSizeRelativeToSquare,
                }}
            />
        </Box>
    )
}
