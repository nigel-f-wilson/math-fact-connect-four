import React from 'react'
import PropTypes from 'prop-types'

// Logic
import { gameIsOver, nextPlayerColor } from './logic/connectFourLogic'

// MUI  components
import { Box, Container, Slide, Typography, Zoom } from '@material-ui/core'

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

    function getColumnChipColors(columnIndex) {
        let chipColors = boardChipColors().filter((player, cellId) => cellId % 7 === columnIndex)
        // console.log(`CHIP COLORS for Column ${columnIndex}: ${chipColors}`)
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
                position: 'absolute',
                top: 0,
                height: '95%',
                width: '95%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}
        >
            <InfoHeaderRow gameStatus={gameStatus} />  
            {columnNumbers.map((columnIndex) => {
                let chipColors = getColumnChipColors(columnIndex)
                return (
                    <Column 
                        key={columnIndex}
                        index={columnIndex}
                        chipColors={chipColors}
                        gameStatus={gameStatus}
                        nextPlayerColor={nextPlayerColor(gameStatus)}
                        handleColumnClick={handleColumnClick}
                    />
                )
            })}
            <RoundedBoardFrame />
        </Container>
    )
}


function InfoHeaderRow(props) {
    let { gameStatus } = props
    let gameOver = gameIsOver(gameStatus)
    let message = ""
    if (gameOver) {
        message = (gameStatus === "playerOneWins" ? "Red Wins!" : "Yellow Wins!")
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
function RoundedBoardFrame(props) {
    return (
        <Box id='roundedGameBorder'
            sx={{
                boxSizing: 'content-box',
                position: 'absolute',
                top: squarePercentage,
                left: '-9px',
                width: 'calc(100% - 2px)',
                height: heightOfSixSquares,
                border: "10px solid",
                borderColor: "board.main",
                borderRadius: "10px",
                borderTop: 0
            }}
        />
    )
}
function Column(props) {
    const { index, chipColors, gameStatus, nextPlayerColor, handleColumnClick } = props
    let columnLetter = ''
    if (!gameIsOver(gameStatus)) {
        switch (index) {
            case 0:
                columnLetter = 'A'
                break;
            case 1:
                columnLetter = 'B'
                break;
            case 2:
                columnLetter = 'C'
                break;
            case 3:
                columnLetter = 'D'
                break;
            case 4:
                columnLetter = 'E'
                break;
            case 5:
                columnLetter = 'F'
                break;
            case 6:
                columnLetter = 'G'
                break;
            default:
                columnLetter = 'error'
                break;
        }
    }
    return (
        <Box id="column" 
            // ref={hoverRef} 
            onClick={() => handleColumnClick(index)}
            sx={{
                position: 'relative',
                width: squarePercentage,
                height: '100%',
                zIndex: 9,
                '&:hover #hoverChip': {
                    backgroundColor: `chip.${nextPlayerColor}`,
                },
            }}
        >
            <HoverChipArea columnLetter={columnLetter} />
            <ChipContainer chipColors={chipColors} />
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
    const { color } = props
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box id="chip"
                    sx={{
                        borderRadius: '50%',
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
Chip.propTypes = {
    id: PropTypes.number.isRequired,
    color: PropTypes.oneOf(['playerOne', 'playerTwo', 'unclaimed']),
}

function HoverChipArea(props) {
    return (
        <Box id="hoverChipContainer"
            sx={{
                // border: 'solid red 1px',
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    fontSize: '2rem'
                }}
            >
                {props.columnLetter}  
            </Box>
        </Box>
    )
}
function ChipContainer(props) {
    return (
        <Box id="chipContainer"
            sx={{
                width: '100%',
                position: 'absolute',
                top: squarePercentage,
                bgcolor: 'transparent',
                height: heightOfSixSquares,
                zIndex: 8,
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
        >
            {props.chipColors.map((color, index) => {
                return <Chip
                    key={index}
                    id={index}
                    color={color}
                // transition={false}
                />
            })}
        </Box>
    )
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
                    boxShadow: '0px 1px 1px 1px #0039cb',
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


