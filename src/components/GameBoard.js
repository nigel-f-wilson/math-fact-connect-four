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

    let boardData = getBoardDataFromMoveList(moveList)  // board data is an array of 7 arrays of varying length. 
    let lastChipDropped = getLastChipDropped(moveList)  // id of Chip. May want to change this to column id. 


    console.log(`Rendering Board with data: ${boardData}`)
    console.log(`Last Chip dropped: ${lastChipDropped}`)

    
    return (
        <Container disableGutters
            sx={{
                position: 'relative',
                height: squareSideLength,
                width: squareSideLength,
                display: 'flex',
                flexDirection: 'row',
            }}>
                {boardData.map((columnDataArray, columnIndex) => {
                    return (<Column 
                        key={columnIndex}
                        index={columnIndex}
                        data={columnDataArray}
                        lastMoveWasHere={lastChipDropped % 7 === columnIndex}
                        nextPlayerColor={nextPlayerColor(gameStatus)}
                        handleColumnClick={handleColumnClick}
                        // onClick={handleColumnClick}
                    />)
                })}

                <Box id='borderContainer' 
                    sx={{
                        boxSizing: 'content-box',
                        position: 'absolute',
                        top: squarePercentage,
                        left: '-1rem',
                        width: '100%',
                        height: heightOfSixSquares,
                        border: "1rem solid",
                        borderColor: "board.main",
                        borderRadius: "1rem",
                        borderTop: 0
                    }}
                >

                </Box>
        </Container>
    )
}

function Column(props) {
    const { index, columnDataArray, nextPlayerColor, handleColumnClick } = props
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
            <SlidingChipContainer 
                slideLast={true}                ////  Currently this will animate the last chip in each column. Easy to fix using lastMoveMade in Play 
                colorList={columnDataArray}
            />
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
    const { slideLast, colorList } = props
    
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
            
        </Box>
    )
}



function getBoardDataFromMoveList(moveList) {  // board data is an array of 7 arrays of varying length.
    let boardData = new Array(7).fill(new Array(0))
    moveList.forEach((squareId, turn) => {
        if (squareId !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
            let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
            let columnId = squareId % 7
            let columnData = boardData[columnId]
            columnData.push(player)
            boardData[columnId] = columnData
        }
    })
    return boardData
}  
function getLastChipDropped(moveList) {
    let removeSkippedTurns = moveList.filter(move => move !== -1)
    let lastChipDropped = removeSkippedTurns[removeSkippedTurns.length - 1]
    return lastChipDropped
}


function nextPlayerColor(gameStatus) {
    return gameIsOver(gameStatus) ? "background" : (gameStatus === "playerOnesTurn") ? "playerOne" : "playerTwo"
}



function Columns(props) {
    const { handleColumnClick, gameStatus } = props
    const topOffsetPercent = 10
    const heightPercent = 100 - topOffsetPercent

    return (
        <Box id="demo"
            sx={{
                bgcolor: 'primary.main',
                width: '100%',
                height: `${heightPercent}%`,
                position: 'absolute',
                top: `${topOffsetPercent}%`,
                left: 0,
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <SlideFromContainer 
                handleColumnClick={handleColumnClick}
                gameStatus={gameStatus}
            />
            <SlideFromContainer
                handleColumnClick={handleColumnClick}
                gameStatus={gameStatus}
            />
            <SlideFromContainer
                handleColumnClick={handleColumnClick}
                gameStatus={gameStatus}
            />
            <SlideFromContainer
                handleColumnClick={handleColumnClick}
                gameStatus={gameStatus}
            />
           
        </Box>
    );
}

// Chip Data is an array of 42 cells each containing an object with keys: "id", "color", "slideIn", ""
function GridOfChips(props) {
    const { moveList  } = props

    // const chipData = getChipData(moveList)
    // const chipData = {
    //     lastDrop: 0,
    //     list: [1,2,1,2,,1,2]
    // }


    return (
        <Box id="chipGrid"
            sx={{
                bgcolor: 'primary.main',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: "10%",
                left: 0,
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            {/* {chipData.list.map((data, index) => {
                const chipColor = `chip.${data.list[index]}`
                return (
                    <Chip key={index} color={chipColor} />
                )
            })} */}
            {/* <Box id="chipColumn"
                sx={{
                    width: squarePercentage,
                    height: '100%',
                    position: 'absolute',
                    top: "10%",
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>

            </Box> */}
{/* 
            <SlideInChip key={1} color={'playerOne'} appear={false} in={false} />
            <Chip key={1} color={'playerOne'} />
             */}

        </Box>
    );
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



function HoverChip(props) {
    const { columnId, color } = props
    let bgcolor = `chip.${color}`
    return (
        <Box id="transparentSquareFrame"
            sx={{
                // overflow: 'hidden',
                // bgcolor: '#FFF',
                width: '100%',
                height: squarePercentage,
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
    )
}
function Chip(props) {
    const { id, color, transition,  } = props

    
    let bgcolor = `chip.${props.color}`
 
    return (
        <Slide  direction="down" in={true} >
            <Box id="transparentSquareFrame"
                sx={{
                    // overflow: 'hidden',
                    bgcolor: '#FFF',

                    width: squarePercentage,
                    height: squarePercentage,
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
function SlideInChip(props) {
    const { id, color, transition, } = props


    let bgcolor = `chip.${props.color}`

    return (
        <Slide enterOnMount={false} direction="down" in={true} >
            <Box id="transparentSquareFrame"
                sx={{
                    // overflow: 'hidden',
                    bgcolor: '#FFF',

                    width: squarePercentage,
                    height: squarePercentage,
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



function GridOfSquaresWithHoles(props) {
    let columns = Array(7)
    return (
        <Box id="gridOfSquaresWithHoles"
            sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
            }}
        >
            {columnNumbers.map((item, index) => {
                return (<ColumnOfSquaresWithHoles key={index} />)
            })}
        </Box>
    )
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
            // key={props.index}
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
