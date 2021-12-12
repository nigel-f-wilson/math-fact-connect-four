import React, { useState } from 'react'

// MUI  components
import { Box, Button, IconButton, Dialog, Zoom, Typography, FormControl, InputLabel, OutlinedInput, Grid } from '@material-ui/core'
import { Radio, RadioGroup, Checkbox, Slider, Switch, FormControlLabel, FormGroup, FormHelperText } from '@material-ui/core';
import { Settings } from '@material-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faRobot } from '@fortawesome/free-solid-svg-icons';

// Style & Layout Constants
const opponentHeight = "25%"
const topicHeight = "30%"
const difficultyHeight = "25%"
const inputHeight = "15%"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

const HeaderText = () => {
    return (
        <Typography  
            variant='h3'
            sx={{
                width: '100%',
                marginTop: 2,
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            Choose Math Topics
        </Typography>
    )
}




export function NewGameSettingsModal(props) {
    let { 
        open,
        boardSideLength,
        startNewGame,
        cancelNewGame,
    } = props

    // let [settings, setSettings] = React.useState({
    //     opponent: "human",
    //     mathTopics: {
    //         combine: true,
    //         multiply: true,
    //     },
    //     difficultyMode: "increasing",
    // })
    
    let [opponent, setOpponent] = React.useState("human")
    let [mathTopics, setMathTopics] = React.useState({
        combine: true,
        multiply: false,
    })
    let [difficultyMode, setDifficultyMode] = React.useState("increasing")


    return (
        <Dialog
            disableEscapeKeyDown
            open={open}
            onBackdropClick={() => { }}  // disable close on bg click
            aria-describedby="math-question-dialog"
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
                    p: 3
                }
            }}
        >
            {/* <HeaderText /> */}

            <OpponentSelector />

            <MathTopicSelector />
            <DifficultyModeSelector />

            <Box sx={{
                border: `solid green 1px`,
                height: inputHeight,
                display: 'flex',
                justifyContent: 'flex-end',
                py: 2,
                pr: 1,
            }}>
                <CancelButton 
                    cancelNewGame={cancelNewGame}
                />
                <StartGameButton 
                    startNewGame={startNewGame}
                />
            </Box>

        </Dialog>
    )


    function OpponentSelector() {
        
        
        return (
            <Box sx={{ 
                border: 'solid red 1px',
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
                    onClick={() => setOpponent("human")}
                    sx={{
                        // border: 'solid blue 1px',
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
                    onClick={() => setOpponent("bot")}
                    sx={{ 
                        // border: 'solid blue 1px',
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
        // const noneSelectedError = Object.values(mathTopics).filter((v) => v).length === 0;
        
        return (
            <Box sx={{
                border: 'solid red 1px',
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
                <Grid container spacing={2}  >
                    <Grid item xs={12} >
                        <MathTopicButton topic="combine" />
                    </Grid>
                    <Grid item xs={12} >
                        <MathTopicButton topic="multiply" />
                    </Grid>
                </Grid>
                <Typography
                    variant='h5'
                    align="center"
                    display={(mathTopics.length === 0) ? "flex" : "none" }
                >
                    You must select at least one topic.
                </Typography>
            </Box>
        )
        function MathTopicButton(props) {
            const { topic } = props

            let selected = Object.values(mathTopics).includes(topic)

            return (
                <Button
                    onClick={() => setMathTopics(prev => !(prev.topic))}
                    variant={ selected ? "contained" : "outlined" }
                    sx={{  width: '100%' }}
                >
                    {getTopicButtonText(topic)}
                </Button>
            )
        }
        function getTopicButtonText(topic) {
            console.assert(topic === "combine" || topic === "multiply")
            return (topic === "combine") ? "Combine and Break Apart" : "Multiply and Factor"
        }
    }

    function DifficultyModeSelector() {
        
        
        return (
            <Box sx={{
                border: 'solid red 1px',
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
                <Grid container spacing={2}  >
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
                    onClick={() => setDifficultyMode(mode)}
                    variant={(difficultyMode === mode) ? "contained" : "outlined"}
                    sx={{
                        width: "100%"
                    }}
                    children={`${mode}`}
                />
            )
        }
    }



    function CancelButton(props) {
        const { cancelNewGame } = props
        return (
            <Button
                onClick={cancelNewGame}
                variant='outlined'
                // color="error.main"
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
        // let disabled = ()
        
        return (
            <Button
                onClick={() => startNewGame(mathTopics, difficultyMode, opponent)}
                variant='contained'
                sx={{
                    m: 1,
                    width: '42%'
                }}
                children="Start New Game"
                // disabled={disabled}
            />
        )
    }

    
}


