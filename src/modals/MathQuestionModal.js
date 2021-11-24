import React from 'react'

// MUI  components
import { Box, Button, 
    Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, 
    Zoom, TextField, Typography, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core'

// Style & Layout Constants

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    // console.log(`QUESTION MODAL PROPS: ${JSON.stringify(props)}`)

    const instructionsHeight = "35%"
    const equationHeight = "30%"
    const inputHeight = "35%"


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
            maxWidth='md'
            PaperProps={{
                style: {
                    margin: 0,
                    height: `${0.9 * maxSquareSideLength}px`,
                    width: `${0.9 * maxSquareSideLength}px`,
                    borderRadius: '50%',
                }
            }}
        >
            <InstructionsText 
                instructions={instructions}
            />
            <QuestionEquation 
                formatString={formatString}
                missingVar={missingVar}
                vars={vars}
            />
            <AnswerInputComponent 
                question={question}
                handleAnswerSubmit={handleAnswerSubmit}
            />
        </Dialog>
    )

    function InstructionsText(props) {
        return (
            <Typography id="Instructions"
                variant='h3'
                sx={{
                    // border: 'solid red 1px',
                    height: instructionsHeight,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}
            >
                {props.instructions}
            </Typography>
        )
    }
    function QuestionEquation(props) {
        const { formatString, vars, missingVar } = props

        return (
            <Typography variant='h1' 
                sx={{
                    width: '100%',
                    height: equationHeight,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'visible',
                }}
            >
                {formatString}
            </Typography>
        )
    }
    function AnswerInputComponent(props) {
        const { question, handleAnswerSubmit } = props
        const { answerInputType } = question

        if (answerInputType === "textField") {
            return (
                <NumericalTextInput
                    handleAnswerSubmit={handleAnswerSubmit}
                />
            )
        }
        else if (answerInputType === "compareButtons") {
            return (
                <CompareButtons 
                    handleAnswerSubmit={handleAnswerSubmit}
                />
            )
        }
        else {
            console.log(`getInputComponent failed. Invalid answerInputType: ${answerInputType}`)
        }

        function NumericalTextInput(props) {
            const { handleAnswerSubmit } = props
            const [answer, setAnswer] = React.useState("");

            const handleChange = (event) => {
                setAnswer(event.target.value);
            }
            let answerIsNum = /^\d+$/.test(answer)
            let error = (answer.length > 0 && !answerIsNum)

            return (
                <Box sx={{
                    height: inputHeight,
                    width: '100%',
                    padding: '0 15%',
                }}>
                    <FormControl id="answer-input-form"
                        color="primary"
                        error={error}
                        sx={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <InputLabel>{(error === false) ? "Your Answer" : "Enter a whole number"}</InputLabel>
                        <OutlinedInput
                            autoFocus
                            id="answer-input"
                            label={(error === false) ? "Your Answer" : "Enter a whole number"}
                            fullWidth
                            size="small"
                            inputMode='numeric'
                            pattern='[0-9]*'
                            value={answer}
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                        />
                        <Button
                            onClick={() => handleAnswerSubmit(question, answer)}
                            variant='contained'
                            sx={{ ml: 1, px: 2.5 }}
                            children="Submit"
                        />
                    </FormControl>
                </Box>


            )
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
    }
}


