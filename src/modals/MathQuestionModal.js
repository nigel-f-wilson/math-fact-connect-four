import React from 'react'

// MUI  components
import { Box, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Zoom, TextField, Typography } from '@material-ui/core'

// Style & Layout Constants

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    console.log(`QUESTION MODAL PROPS: ${JSON.stringify(props)}`)

    let { open, activeCell, question, handleAnswerSubmit, maxSquareSideLength,  } = props
    let { topic, answerInputType, instructions, formatString, vars, missingVar, } = question

    const answerInputComponent = getInputComponent(answerInputType, handleAnswerSubmit)
    
    return (
        <Dialog 
            // keepMounted
            disableEscapeKeyDown
            open={open}
            // onClose={closeQuestionModal}  // Callback fired when the component requests to be closed.
            onBackdropClick={() => {}}  // disable close on bg click
            aria-describedby="math-question-dialog"
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={false}
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',

            }}
            PaperProps={{
                style: {
                    // backgroundColor: 'red',
                    height: `${0.9 * maxSquareSideLength}px`,
                    width: `${0.9 * maxSquareSideLength}px`,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem'
                }
            }}
            
        >
            <DialogTitle id="Instructions"
                sx={{ 
                    // border: 'solid red 1px', 
                    height: '30%',
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.4rem', 
                }}
            >
                {instructions}
            </DialogTitle>

            
            <DialogContent id="Equation" 
                dividers
                sx={{ width: '100%', 
                    // border: 'solid red 1px',
                    flex: '0 0 40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '3rem',
                    overflow: 'hidden'
                }}
            >
                {formatString}
            </DialogContent>

            {answerInputComponent}
            
        </Dialog>
    )
}

function getInputComponent(answerInputType, handleAnswerSubmit) {
    let height = "30%"
    if (answerInputType === "textField") {
        return (
            <DialogActions sx={{ height: height }} >
                <TextField
                    variant="outlined"
                    handleAnswerSubmit={handleAnswerSubmit}
                />
                <Button
                    onClick={handleAnswerSubmit}
                    variant='contained'
                    sx={{ ml: 4 }}
                    children="Submit"
                />
            </DialogActions>
        )
    }
    else if (answerInputType === "compareButtons") {
        return (
            <DialogActions sx={{ height: height }} >
                <CompareButtons
                    handleAnswerSubmit={handleAnswerSubmit}
                />
            </DialogActions>
        )
    }
    else {
        console.error(`getInputComponent failed. Invalid answerInputType: ${answerInputType}`)
    }
}


function CompareButtons(props) {
    let { handleAnswerSubmit } = props

    
    return (
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}

        >
            <Button />
            <Button />

            <Button />

        </Box>
    )
}
