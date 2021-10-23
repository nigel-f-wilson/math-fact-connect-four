import React from 'react'

// MY  components

// MUI  components
import { Box, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Zoom, TextField, Typography } from '@material-ui/core'
// import { height, width } from '@material-ui/system'

// Style & Layout Constants

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    let { modalState, boardAreaSideLength, handleAnswerSubmit, closeQuestionModal } = props
    let { isOpen, activeCell, question } = modalState
    let { topic, inputType, instruction, formatString, vars, missingVar, } = question

    let input = (inputType === "textField") ? 
        <TextField 
            id="answer"
            variant="outlined"
            handleAnswerSubmit={handleAnswerSubmit}

        /> : 
        <CompareButtons 
            handleAnswerSubmit={handleAnswerSubmit}
        />
    
    
    console.log(`board area side length: ${boardAreaSideLength}`);
    
    return (
        <Dialog keepMounted
            disableEscapeKeyDown
            open={isOpen}
            // onClose={closeQuestionModal}  // Callback fired when the component requests to be closed.
            onBackdropClick={() => {}}
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
            BackdropProps={{
                style: {
                    // backgroundColor: 'red',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }}
            PaperProps={{
                style: {
                    // backgroundColor: 'red',
                    height: `${0.9 * boardAreaSideLength}px`,
                    width: `${0.9 * boardAreaSideLength}px`,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3rem'
                }
            }}
            
        >
            <DialogTitle id="Instructions"
                sx={{ border: 'solid red 1px', height: '30%' }}
            >
                {/* {instruction} */}
                <Typography
                    variant='h6'
                    align='center'
                >
                    {instruction}
                </Typography>
            </DialogTitle>

            
            <DialogContent id="Equation" dividers
                sx={{ width: '100%', 
                border: 'solid red 1px',
                flex: '0 0 40%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',


                }}
            >
                <Typography
                    variant='h1'
                    align='center'
                >
                    {formatString}
                </Typography>
            </DialogContent>


            <DialogActions id="AnswerInput"
                sx={{ border: 'solid red 1px', height: '30%' }}
            >
                
                {input}
                <Button onClick={closeQuestionModal}>Agree</Button>
                
            </DialogActions>
        </Dialog>
    )
}
