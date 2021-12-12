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

export function MathQuestionModal(props) {
    let { question, 
        open,
        headerText,
        nextPlayerColor,
        handleAnswerSubmit, 
        boardSideLength } = props 
    
    let { correctAnswer, equationString, inputType } = question
    let borderColor = `chip.${nextPlayerColor}`

    return (
        <Dialog 
            // keepMounted
            disableEscapeKeyDown
            open={open}
            onBackdropClick={() => {}}  // disable close on bg click
            aria-describedby="math-question-dialog"
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth='md'
            PaperProps={{
                sx: {
                    // border: `solid ${nextPlayerColor(gameStatus)} 5px`,
                    border: `solid green 0.5rem`,
                    // border: `solid ${borderColor} 5px`,
                    borderColor: borderColor,
                    margin: `${0.05 * boardSideLength}px`,
                    height: `${0.9 * boardSideLength}px`,
                    width: `${0.9 * boardSideLength}px`,
                    borderRadius: '50%',
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start'

                }
            }}
        >
            <HeaderText headerText={headerText} />
            <QuestionEquation equationString={equationString} />
            <AnswerInputComponent 
                inputType={inputType}
                correctAnswer={correctAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
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
        const fontStyle = (equationString.length > 12) ? 'h2' : 'h1'

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
        const { inputType, correctAnswer, handleAnswerSubmit } = props

        // const [submitted, setSubmitted] = useState(false)
        const [playersAnswer, setPlayersAnswer] = useState("")
        const answerIsNum = /^\d+$/.test(playersAnswer)
        const error = (playersAnswer.length > 0 && !answerIsNum)

        const handlePlayersAnswerChange = (event) => {
            let updatedAnswer = event.target.value.trim()
            setPlayersAnswer(updatedAnswer)
        }
        const handlePlayersAnswerSubmit = () => {
            // if (submitted) {
                // return // No Effect
            // }
            // else {
                // setSubmitted(true)
                handleAnswerSubmit(playersAnswer)
            // }
        }

        if (inputType === "textField") {
            return (
                <NumericalTextInput
                    error={error}
                    handleSubmitButtonClick={handlePlayersAnswerSubmit}
                />
            )
        }
        else if (inputType === "compareButtons") {
            return (
                <CompareButtons 
                    // handleSubmitButtonClick={() => handleAnswerSubmit(playersAnswer)}
                />
            )
        }
        else {
            console.error(`getInputComponent failed. Invalid inputType: ${inputType}`)
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
                            // type="number"
                            type="tel"
                            // pattern="\d*"
                            pattern='[0-9]*'
                            onChange={handlePlayersAnswerChange}
                            inputProps={{ 
                                style: { fontSize: '2rem', height: '2rem' }
                            }}
                            sx={{ width: '62%' }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    // setSubmitted(true)
                                    handleSubmitButtonClick()
                                }
                            }}
                        />
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
            const { handleSubmitButtonClick } = props
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
                    children="Submit"
                />
            )
        }

        function CompareButtons(props) {
            // let { handleSubmitButtonClick } = props

            return (
                <Box 
                    sx={{
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


