import React, { useState } from 'react'

// MUI  components
import { Box, Button, Dialog, Zoom, Typography, FormControl, InputLabel, OutlinedInput } from '@material-ui/core'

// Style & Layout Constants
const instructionsHeight = "33%"
const equationHeight = "32%"
const inputHeight = "35%"

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
        handleStartGameClick,
        handleCancel
    } = props

    let borderColor = `board.dark`

    

    return (
        <Dialog
            // keepMounted
            disableEscapeKeyDown
            open={open}
            onBackdropClick={() => { }}  // disable close on bg click
            aria-describedby="math-question-dialog"
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth='md'
            PaperProps={{
                sx: {
                    // border: `solid green 1rem`,
                    // borderColor: borderColor,
                    height: `${0.85 * boardSideLength}px`,
                    width: `${0.7 * boardSideLength}px`,
                    borderRadius: '3rem',
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start'
                }
            }}
        >
            <HeaderText />



            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                pr: 1,
            }}>
                <CancelButton />
                <StartGameButton />
            </Box>

        </Dialog>
    )

    
}


function CancelButton(props) {
    const { cancelNewGame } = props
    return (
        <Button
            onClick={cancelNewGame}
            // color="error.main"
            variant='contained'
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
            onClick={startNewGame}
            variant='contained'
            sx={{
                m: 1,
                width: '42%'
            }}
            children="Start Game"
        />
    )
}