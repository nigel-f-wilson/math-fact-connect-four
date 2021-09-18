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
import { Box, Switch, Paper, Slide, FormControlLabel } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'

let rowNumbers = [0, 1, 2, 3, 4, 5]
let columnNumbers = [0, 1, 2, 3, 4, 5, 6]



export function GameBoard(props) {
    const orientation = useScreenOrientation()
    const height = useScreenHeight()
    const width = useScreenWidth()

    let { moveList, handleColumnClick, gameStatus } = props 
    let boardData = getBoardDataFromMoveList(moveList)  // board data is an array of 7 arrays of varying length. 

    
    return (
        <Box id='max-height-box' 
            sx={{ maxHeight: '90vh',
                border: "1rem solid ",
                borderColor: "board.main",
                borderRadius: "1rem"
            }} >
            <Box id='square-box-outter' sx={{ height: 0, overflow: 'hidden', pt: '100%', position: 'relative' }} >
                <Box id='square-box-inner' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex' }} >
                    {/* <Box id='columns' sx={{ display: 'flex' }} > */}
                    {/* {columnNumbers.map(columnId => {
                        return (
                            <Column key={columnId} 
                                columnId={columnId}
                                chipColors={columnChipColorsFromMoveList(columnId, moveList)}
                                lastMoveWasMadeHere={columnWhereLastMoveWasMade(moveList) === columnId}
                                gameStatus={gameStatus}
                                handleColumnClick={handleColumnClick} 
                            />
                        )
                    })} */}
                    {/* </Box> */}
                    
                    <ColumnsWithHoverAndClickHandler 
                        handleColumnClick={handleColumnClick}
                        gameStatus={gameStatus}
                    />
                    <GridOfChips moveList={moveList} />
                    <SlideFromDemo />
                    <GridOfSquaresWithHoles />
                </Box>
            </Box>
        </Box>
    )
    
}


function getBoardDataFromMoveList(moveList) {  // board data is an array of 7 arrays of varying length.
    let boardData = new Array(7)
    moveList.forEach((squareId, turn) => {
        if (squareId !== -1) {              // -1 in moveList indicates a turn skipped due to wrong answer to math question
            let player = (turn % 2 === 0) ? "playerOne" : "playerTwo"  // Player One's moves are at Even indices in the moveList
            let columnId = squareId % 7
            let columnData = boardData[columnId]
            columnData.push(player)
            boardData[columnId] = columnData
        }
    })
    console.log(`BOARD DATA: ${boardData}`)
    return boardData
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


function SlideFromDemo(props) {
    return (
        <Box id="demo"
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
            <SlideFromContainer />
           
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
    const [checked, setChecked] = React.useState(false);
    const containerRef = React.useRef(null);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Box
            sx={{
                height: '100%',
                width: 240,
                display: 'flex',
                padding: 2,
                borderRadius: 1,
                bgcolor: (theme) =>
                    theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
                overflow: 'hidden',
                zIndex: 9999
            }}
            ref={containerRef}
        >
            <Box sx={{ width: 200 }}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show from target"
                />
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

function Column(props) {
    const { columnId, nextPlayerColor, handleColumnClick } = props
    const [hoverRef, isHovered] = useHover()
    // console.log(`You ${isHovered ? "ARE" : "are NOT"} hovering on column: ${columnId}`)

    return (
        <Box id="column" ref={hoverRef} onClick={() => handleColumnClick(columnId)}
            sx={{ 
                width: squarePercentage,
                height: '100%',
                zIndex: 9900
            }} 
        >
            {isHovered ? <HoverChip color={nextPlayerColor} /> : null }
                
        </Box>
    );
}
Column.propTypes = {
    columnId: PropTypes.number.isRequired,
    nextPlayerColor: PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed']), 
    handleColumnClick: PropTypes.func, 
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
        <Box id="columnOfSquaresWithHoles"
            sx={{
                bgcolor: 'transparent',
                width: squarePercentage,
                height: '100%',
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
                height: squarePercentage,
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
