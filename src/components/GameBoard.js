import React from 'react'
import PropTypes from 'prop-types'

// Logic
import { gameIsOver, nextPlayerColor } from '../logic/helpers'
// Custom Hooks
import { useScreenWidth, useScreenHeight } from "../hooks"

// MUI  components
import { Box, Container, Switch, Paper, Slide, FormControlLabel, Typography, Zoom } from '@material-ui/core'
import { InfoPanel } from './InfoPanel';

// Style & Layout Constants
const oneSixth = '16.666%'
const squarePercentage = '14.287%'
const rowHeightPercentage = '16.665%'
const columnWidthPercentage = '14.280%'
const headerHeightPercentage = columnWidthPercentage
const heightOfSixSquares = '85.714%'

const chipSizeRelativeToSquare = '84%'

let rowNumbers = [0, 1, 2, 3, 4, 5]
let columnNumbers = [0, 1, 2, 3, 4, 5, 6]

export function GameBoard(props) {
    const { moveList, handleColumnClick, gameStatus } = props

    const height = useScreenHeight()
    const width = useScreenWidth()
    const squareSideLength = (height <= width) ? height * 0.9 : width * 0.9

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
            <InfoHeaderRow gameStatus={gameStatus} />  

            {columnNumbers.map((columnIndex) => {
                let chipColors = getColumnChipColors(columnIndex)
                console.log(`Column Chip Colors for column ${columnIndex}: ${chipColors}`)
                return (
                    <Column 
                        key={columnIndex}
                        index={columnIndex}
                        chipColors={chipColors}
                        nextPlayerColor={nextPlayerColor(gameStatus)}
                        handleColumnClick={handleColumnClick}
                    />
                )
            })}
            
            <RoundedBoardFrame />
        </Container>
    )
}

function RoundedBoardFrame(props) {
    return (
        <Box id='roundedGameBorder'
            sx={{
                boxSizing: 'content-box',
                position: 'absolute',
                top: squarePercentage,
                left: '-0.8rem',
                width: '100%',
                height: heightOfSixSquares,
                border: "0.8rem solid",
                borderColor: "board.main",
                borderRadius: "0.8rem",
                borderTop: 0
            }}
        />
    )
}
function InfoHeaderRow(props) {
    let { gameStatus } = props
    let gameOver = gameIsOver(gameStatus)
    let message = ""
    if (gameOver) {
        message = (gameStatus === "playerOneWins" ? "Player One Wins!" : "Player Two Wins!")
    }
    
    return (
        <Box id='infoHeaderRow'
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: headerHeightPercentage,
                zIndex: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Zoom in={message !== ""} style={{ transitionDelay: '300ms' }} >
                <Typography variant='h2' align='center' >
                    {message}
                </Typography>
            </Zoom>
            
            
        </Box>
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
                        // transition={false}
                    />
                })}
            </Box>
            <ColumnOfSquaresWithHoles />

        </Box>
    );
}
Column.propTypes = {
    index: PropTypes.number.isRequired,
    nextPlayerColor: PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed']),
    handleColumnClick: PropTypes.func,
}

function Chip(props) {
    const { id, color } = props
    let claimed = (color !== "unclaimed")
    let bgcolor = `chip.${color}`

    return (
        <Slide in={claimed} 
            direction="down"
            // easing="easing.parabolicAcceleration"
            // easing={{ enter: 'transitions.easing.easeOut', exit: 'transitions.easing.sharp' }}
        >
            <Box id="transparentSquareFrame"
                sx={{
                    width: '100%',
                    height: rowHeightPercentage,
                    // zIndex: 8,
                    // zIndex: 'zIndex.chip',
                    // zIndex: 'chip',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box id="chip"
                    sx={{
                        borderRadius: '50%',
                        // zIndex: 'zIndex.chip',
                        zIndex: 'chip',
                        bgcolor: bgcolor,
                        width: chipSizeRelativeToSquare,
                        height: chipSizeRelativeToSquare,
                    }}
                />
            </Box>
        </Slide>

    )
}
Column.propTypes = {
    index: PropTypes.number.isRequired,
    nextPlayerColor: PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed']),
    handleColumnClick: PropTypes.func,
}





function ColumnOfSquaresWithHoles(props) {
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
    
    return (
        <Box id="columnOfSquares"
            sx={{
                position: 'absolute',
                top: squarePercentage,
                bgcolor: 'transparent',
                width: '100%',
                height: heightOfSixSquares,
                zIndex: 'board',
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


