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

    // const answerInputComponent = getInputComponent(question, handleAnswerSubmit)
    
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
            
            <InstructionsText 
                instructions={instructions}
            />

            
            <DialogContent id="Equation" 
                // dividers
                sx={{ width: '100%', 
                    // border: 'solid red 1px',
                    flex: '0 0 40%',
                    flexFlow: 'row nowrap',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                <Typography 
                    variant='h1' 
                    // sx={{
                    //     fontSize: '700%'
                    // }}
                >
                    {formatString}
                </Typography>

            </DialogContent>

            <AnswerInputComponent 
                question={question}
                handleAnswerSubmit={handleAnswerSubmit}
            />
            
        </Dialog>
    )
}

function InstructionsText(props) {
    return (
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
            {props.instructions}
        </DialogTitle>
    )
}
function AnswerInputComponent(props) {
    const { question, handleAnswerSubmit } = props
    
    let height = "30%"

    const { answerInputType } = question
    const answer = ""

    // const [name, setName] = React.useState('Composed TextField');

    // const handleChange = (event) => {
    //     setName(event.target.value);
    // };

    
    if (answerInputType === "textField") {
        return (
            <DialogActions
                sx={{
                    // border: 'solid red 1px',
                    height: height,
                    width: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: '1.5rem'
                }} 
            >
                <TextField
                    autoFocus
                    label="Your Answer"
                    placeholder=""
                    // error={} // Error if contents include non-numerical characters
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                    margin="none"
                    // handleAnswerSubmit={handleAnswerSubmit()}
                />
                <Button
                    onClick={() => handleAnswerSubmit(question, answer)}
                    variant='contained'
                    sx={{ ml: 1, px: 2.5 }}
                    children="Submit"
                />
                {/* <FormControl error variant="standard">
                    <InputLabel htmlFor="component-error">Name</InputLabel>
                    <Input
                        id="component-error"
                        value={name}
                        onChange={handleChange}
                        aria-describedby="component-error-text"
                    />
                    <FormHelperText id="component-error-text">Error</FormHelperText>
                </FormControl> */}
            </DialogActions>
        )
    }
    else if (answerInputType === "compareButtons") {
        return (
            <DialogActions 
                sx={{ 
                    height: height,
                    width: '80%'
                }} >
                <CompareButtons
                    handleAnswerSubmit={handleAnswerSubmit}
                />
            </DialogActions>
        )
    }
    else {
        console.log(`getInputComponent failed. Invalid answerInputType: ${answerInputType}`)
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
