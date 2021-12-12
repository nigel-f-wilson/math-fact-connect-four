import React from 'react'

// MUI  components
import { Box, Button, IconButton, Dialog, Zoom, Typography, Grid } from '@material-ui/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faRobot } from '@fortawesome/free-solid-svg-icons';

// Style & Layout Constants
const opponentHeight = "25%"
const topicHeight = "35%"
const difficultyHeight = "25%"
const inputHeight = "15%"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})


export function NewGameSettingsModal(props) {
    let { 
        open,
        boardSideLength,
        startNewGame,
        cancelNewGame,
        opponent,
        mathTopics,
        difficultyMode,
        toggleCombine,
        toggleMultiply,
        selectOpponent,
        selectDifficulty
    } = props

    // let opponent = "human"
    // let mathTopics = {
    //     combine: false,
    //     multiply: false,
    // }
    // let difficultyMode = "increasing"

    let noneSelectedError = Object.values(mathTopics).filter((v) => v).length === 0;
    
    return (
        <Dialog
            open={open}
            aria-describedby="game settings dialog"
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth='md'
            PaperProps={{
                sx: {
                    height: `${0.85 * boardSideLength}px`,
                    width: `${0.7 * boardSideLength}px`,
                    minHeight: "550px",
                    minWidth: "375px",
                    borderRadius: '3rem',
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start',
                    px: 2,
                    py: 2
                }
            }}
        >
            <OpponentSelector />
            <MathTopicSelector />
            <DifficultyModeSelector />
            <StartAndCancelButtons 
                cancelNewGame={cancelNewGame}
                startNewGame={startNewGame}
            />
            

        </Dialog>
    )


    function OpponentSelector() {
        return (
            <Box sx={{ 
                // border: 'solid red 1px',
                height: opponentHeight, 
                display: 'flex', 
                flexDirection: 'column' 
                }} >
                <Typography 
                    variant='h5'
                    align="center"
                >
                    Play vs. Human or Bot?
                </Typography>
                <Grid container spacing={2} sx={{ height: '100%', p: "0 2rem" }} >
                    <Grid item xs={6} >
                        <PlayVsHumanButton   />
                    </Grid>
                    <Grid item xs={6} >
                        <PlayVsBotButton />
                    </Grid>
                </Grid>


            </Box>
        )

        function PlayVsHumanButton(props){
            return (
                <IconButton
                    // onClick={() => { opponent = "human" }}
                    onClick={() => selectOpponent("human")}
                    sx={{
                        height: "100%",
                        width: '100%'
                    }}
                    color={(opponent === "human") ? "primary" : "secondary"}
                >
                    <FontAwesomeIcon
                        icon={faUserFriends}
                        size="2x"
                    />
                </IconButton>
            )
        }
        function PlayVsBotButton(props) {
            return (
                <IconButton
                    // onClick={() => {opponent = "bot"}}
                    onClick={() => selectOpponent("bot")}
                    sx={{ 
                        height: "100%",
                        width: '100%' 
                    }}
                    color={(opponent === "bot") ? "primary" : "secondary"}

                >
                    <FontAwesomeIcon
                        icon={faRobot}
                        size="2x"
                    />
                </IconButton>
            )
        }

    }

    function MathTopicSelector() {
        
        return (
            <Box sx={{
                // border: 'solid red 1px',
                height: topicHeight,  
                display: 'flex', 
                flexDirection: 'column' 
            }}>
                <Typography
                    variant='h5'
                    align="center"
                    gutterBottom
                >
                    What math topics should we include?
                </Typography>
                <Grid container spacing={1} px="2rem" >
                    <Grid item xs={12} >
                        <CombineButton />
                    </Grid>
                    <Grid item xs={12} >
                        <MultiplyButton />
                    </Grid>
                    <Grid item xs={12} sx={{ py: 0 }}>
                        <Typography
                            variant='body1'
                            align="center"
                            color="error"
                            display={noneSelectedError ? "flex" : "none"}
                            gutterBottom
                        >
                            *** You must select at least one topic.
                        </Typography>
                    </Grid>
                </Grid>
                
            </Box>
        )
        function CombineButton(props) {
            let selected = (mathTopics.combine === true)
            return (
                <Button
                    onClick={toggleCombine}
                    variant={selected ? "contained" : "outlined"}
                    sx={{ width: '100%' }}
                    children={
                        "Combine & Split Up"
                    }
                />
            )
        }
        function MultiplyButton(props) {
            let selected = (mathTopics.multiply === true)
            return (
                <Button
                    onClick={toggleMultiply}
                    variant={selected ? "contained" : "outlined"}
                    sx={{ width: '100%' }}
                    children={
                        "Multiply & Factor"
                    }
                />
            )
        }
    }

    function DifficultyModeSelector() {
        return (
            <Box sx={{
                height: difficultyHeight,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography
                    variant='h5'
                    align="center"
                    gutterBottom
                >
                    How hard should the questions be?
                </Typography>
                <Grid container spacing={1} px="2rem" >
                    <Grid item xs={4} >
                        <DifficultyModeButton mode="easy" />
                    </Grid>
                    <Grid item xs={4} >
                        <DifficultyModeButton mode="medium" />
                    </Grid>
                    <Grid item xs={4} >
                        <DifficultyModeButton mode="hard" />
                    </Grid>
                    <Grid item xs={12} >
                        <DifficultyModeButton mode="increasing" />
                    </Grid>
                </Grid>
            </Box>
        )
        function DifficultyModeButton(props) {
            let { mode } = props
            return (
                <Button
                    onClick={() => selectDifficulty(mode)}
                    variant={(difficultyMode === mode) ? "contained" : "outlined"}
                    sx={{
                        width: "100%"
                    }}
                    children={(mode === "increasing") ? "increasing difficulty" : `${mode}`}
                />
            )
        }
    }

    function StartAndCancelButtons() {
        return(
            <Box sx={{
                borderTop: `solid green 3px`,
                borderColor: 'primary.main',
                height: inputHeight,
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
                mb: 1,
                pt: 2,
                pr: 1,
            }}>
                <CancelButton
                    cancelNewGame={cancelNewGame}
                />
                <StartGameButton
                    startNewGame={startNewGame}
                />
            </Box>
        )
    }
    function CancelButton(props) {
        const { cancelNewGame } = props
        return (
            <Button
                onClick={cancelNewGame}
                variant='outlined'
                // color="error"
                disabled={noneSelectedError}
                sx={{
                    m: 1,
                    width: '42%'
                }}
                children="Cancel"
            />
        )
    }
    function StartGameButton(props) {
        const { startNewGame } = props
        return (
            <Button
                onClick={() => startNewGame(mathTopics, difficultyMode, opponent)}
                variant='contained'
                disabled={noneSelectedError}
                sx={{
                    m: 1,
                    width: '42%'
                }}
                children="Start Game"
            />
        )
    }

    
}


