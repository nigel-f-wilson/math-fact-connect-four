import React, { useState } from 'react'


// MUI  components
import { Box, Button, Dialog, Zoom, Typography, 
    TextField, FormControl, InputLabel, OutlinedInput, FormHelperText,  
} from '@material-ui/core'
import { generateQuestion } from '../logic/questionGenerator'

// Style & Layout Constants
const instructionsHeight = "30%"
const equationHeight = "35%"
const inputHeight = "35%"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})



export function MathQuestionModal(props) {
    let { mathTopics, topic, questionsRightSoFar, turnNumber, open, handleAnswerSubmit, boardSideLength } = props
    
    const [question, setQuestion] = React.useState(generateQuestion(mathTopics, questionsRightSoFar))
    // let question = generateQuestion(mathTopics, questionsRightSoFar)
    console.log(`NEW QUESTION: ${JSON.stringify(question, null, 4)}`)

    
    let { type, vars, correctAnswer, instructions, equationString } = question

    const [playersAnswer, setPlayersAnswer] = React.useState("")
    const [headerText, setHeaderText] = React.useState(instructions)

    const answerIsNum = /^\d+$/.test(playersAnswer)
    const error = (playersAnswer.length > 0 && !answerIsNum)
    
    function answerIsCorrect(pa = playersAnswer, ca = correctAnswer) {
        return (Number(pa.trim()) === ca)
    }
    const handlePlayersAnswerChange = (event) => {
        let updatedAnswer = event.target.value.trim()
        setPlayersAnswer(updatedAnswer)
    }
    function handleSubmitButtonClick() {
        if (error) {
            console.warn(`Returning early from answer submit b/c answer is blank or not a number.`);
            return -1
        }
        const correct = answerIsCorrect()
        const answerFeedbackHeaderText = (correct ? "Correct!" : `Nope. It was ${correctAnswer}.`)
        setHeaderText(answerFeedbackHeaderText)
        console.log(`answerFeedbackHeaderText: ${answerFeedbackHeaderText} `)
        handleAnswerSubmit(correct)
        setTimeout(() => {
            setPlayersAnswer("")
            setHeaderText(instructions)
            setQuestion(generateQuestion(mathTopics, questionsRightSoFar))
        }, 1500);

    }

    return (
        <Dialog 
            keepMounted
            disableEscapeKeyDown
            open={open}
            onBackdropClick={() => {}}  // disable close on bg click
            aria-describedby="math-question-dialog"
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth='md'
            PaperProps={{
                style: {
                    margin: `${0.05 * boardSideLength}px`,
                    height: `${0.9 * boardSideLength}px`,
                    width: `${0.9 * boardSideLength}px`,
                    borderRadius: '50%',
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start'

                }
            }}
        >
            <HeaderText 
                // key={1}
                key={turnNumber}  // May be able to use key prop to force state reset to initial.
                headerText={headerText}
            />
            <QuestionEquation 
                equationString={equationString}
            />
            <AnswerInputComponent 
                question={question}
                error={error}
                handlePlayersAnswerChange={handlePlayersAnswerChange}
                handleSubmitButtonClick={handleSubmitButtonClick}
            />
        </Dialog>
    )

    
    
    function HeaderText(props) {
        return (
            <Typography id="Instructions"
                variant='h3'
                sx={{
                    height: instructionsHeight,
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}
            >
                {props.headerText}
            </Typography>
        )
    }
    function QuestionEquation(props) {
        const { equationString } = props
        const fontStyle = (equationString.length > 14) ? 'h2' : 'h1'

        return (
            <Typography variant={fontStyle} 
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
        const { question, error, handleSubmitButtonClick, handlePlayersAnswerChange } = props
        const answerInputType = question.inputType

        if (answerInputType === "textField") {
            return (
                <NumericalTextInput
                    error={error}
                    handleSubmitButtonClick={handleSubmitButtonClick}
                />
            )
        }
        else if (answerInputType === "compareButtons") {
            return (
                <CompareButtons 
                    // handleAnswerSubmit={handleAnswerSubmit}
                    // handleSubmitButtonClick={handleSubmitButtonClick}
                />
            )
        }
        else {
            console.log(`getInputComponent failed. Invalid answerInputType: ${answerInputType}`)
        }

        function NumericalTextInput(props) {
            const { error, handleSubmitButtonClick } = props
            

            return (
                <Box sx={{
                    height: inputHeight,
                    width: '100%',
                    padding: '0 20%',
                }}>
                    <FormControl 
                        id="answer-input-form"
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
                            label={(error === false) ? "Your Answer" : "Enter a whole number"}
                            value={playersAnswer}
                            id="answer-input"
                            fullWidth
                            size="medium"
                            autoFocus
                            autoComplete='off'
                            inputMode='numeric'
                            pattern='[0-9]*'
                            onChange={handlePlayersAnswerChange}
                            inputProps={{ 
                                style: { fontSize: '2rem', height: '2rem' }
                            }}
                            sx={{ width: '62%' }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSubmitButtonClick()
                                }
                            }}
                        />
                        {/* <FormHelperText 
                            label={(error === false) ? "" : "Enter a whole number"}
                        /> */}
                        <SubmitButton
                            disabled={error}
                            playersAnswer={playersAnswer}
                            correctAnswer={correctAnswer}
                            handleSubmitButtonClick={handleSubmitButtonClick}
                            

                        />
                    </FormControl>
                </Box>


            )
        }
        function SubmitButton(props) {
            const { playersAnswer, correctAnswer, handleSubmitButtonClick } = props
            return (
                <Button
                    onClick={handleSubmitButtonClick}
                    variant='contained'
                    // size="large"
                    sx={{ 
                        ml: 1, 
                        px: 2.5,
                        lineHeight: '3rem',
                        width: '42%'
                    }}
                    // children="Check"
                    children="Submit"
                />
            )
        }

        function CompareButtons(props) {
            // let { handleAnswerSubmit, handleSubmitButtonClick } = props


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


