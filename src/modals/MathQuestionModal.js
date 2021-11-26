import React from 'react'

import { 
    getInstructions, 
    getEquationString, 
    getInputType, 
    getCorrectAnswer 
} from '../logic/questionGenerator'


// MUI  components
import { Box, Button, Dialog, Zoom, Typography, 
    TextField, FormControl, InputLabel, OutlinedInput,  
} from '@material-ui/core'

// Style & Layout Constants
const instructionsHeight = "35%"
const equationHeight = "30%"
const inputHeight = "35%"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    let { open, activeCell, question, addMoveToState, handleAnswerSubmit, maxSquareSideLength } = props
    let { topic, type, vars, correctAnswer } = question

    const [playersAnswer, setPlayersAnswer] = React.useState("")

    let instructions = getInstructions(type)
    let equationString = getEquationString(question) 
    
    // let correctAnswer = getCorrectAnswer(question)
    // let answerIsCorrect = (Number(playersAnswer.trim()) === correctAnswer)
    // console.log(`answerIsCorrect: ${answerIsCorrect} `)
    
    function handleSubmitButtonClick(question, playersAnswer) {
        const { correctAnswer } = question
        let answerIsCorrect = (Number(playersAnswer.trim()) === correctAnswer)
        console.log(`answerIsCorrect: ${answerIsCorrect} `)
        handleAnswerSubmit(answerIsCorrect)

    }

    return (
        <Dialog 
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
                    margin: `${0.05 * maxSquareSideLength}px`,
                    height: `${0.9 * maxSquareSideLength}px`,
                    width: `${0.9 * maxSquareSideLength}px`,
                    borderRadius: '50%',
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start'

                }
            }}
        >
            <InstructionsText 
                instructions={instructions}
            />
            <QuestionEquation 
                equationString={equationString}
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
        const { equationString } = props

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
                {equationString}
            </Typography>
        )
    }
    function AnswerInputComponent(props) {
        const { question, handleAnswerSubmit, addMoveToState } = props
        const answerInputType = getInputType(question)

        if (answerInputType === "textField") {
            return (
                <NumericalTextInput
                    handleAnswerSubmit={handleAnswerSubmit}
                    addMoveToState={addMoveToState}
                />
            )
        }
        else if (answerInputType === "compareButtons") {
            return (
                <CompareButtons 
                    handleAnswerSubmit={handleAnswerSubmit}
                    addMoveToState={addMoveToState}
                />
            )
        }
        else {
            console.log(`getInputComponent failed. Invalid answerInputType: ${answerInputType}`)
        }

        function NumericalTextInput(props) {
            const { handleAnswerSubmit, addMoveToState } = props
            const [answer, setAnswer] = React.useState("")
            const [banner, setBanner] = React.useState()

            const handleChange = (event) => {
                setAnswer(event.target.value);
            }
            let answerIsNum = /^\d+$/.test(answer)
            let error = (answer.length > 0 && !answerIsNum)

            const handleSubmitClick = (event) => {
                
            }

            return (
                <Box sx={{
                    height: inputHeight,
                    width: '100%',
                    padding: '0 20%',
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
                            size="medium"
                            inputMode='numeric'
                            pattern='[0-9]*'
                            value={answer}
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSubmitButtonClick(question, answer)
                                }
                            }}
                        />
                        <SubmitButton 
                            answer={answer}
                            handleSubmitClick={handleSubmitClick}
                        />
                    </FormControl>
                </Box>


            )
        }
        function SubmitButton(props) {
            const { answer, handleAnswerSubmit } = props
            return (
                <Button
                    onClick={() => handleSubmitButtonClick(question, answer)}
                    variant='contained'
                    size="large"
                    sx={{ 
                        ml: 1, 
                        px: 2.5,

                    }}
                    children="Submit"
                />
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


