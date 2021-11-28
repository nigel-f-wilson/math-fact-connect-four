import React from 'react'

import { 
    // getInstructions, 
    // getEquationString, 
    // getInputType, 
    // getCorrectAnswer 
} from '../logic/questionGenerator'


// MUI  components
import { Box, Button, Dialog, Zoom, Typography, 
    TextField, FormControl, InputLabel, OutlinedInput, FormHelperText,  
} from '@material-ui/core'

// Style & Layout Constants
const instructionsHeight = "30%"
const equationHeight = "35%"
const inputHeight = "35%"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    let { open, question, handleAnswerSubmit, boardSideLength } = props
    let { type, vars, correctAnswer, instructions, equationString } = question

    const [playersAnswer, setPlayersAnswer] = React.useState("")
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false)
    const [answerFeedBack, setAnswerFeedBack] = React.useState("")

    const answerIsNum = /^\d+$/.test(playersAnswer)
    const error = (playersAnswer.length > 0 && !answerIsNum)
    
    const handlePlayersAnswerChange = (event) => {
        let updatedAnswer = event.target.value
        setPlayersAnswer(updatedAnswer)
        setAnswerIsCorrect(Number(updatedAnswer.trim()) === correctAnswer)
    }
    function handlePlayersAnswerSubmit(question, playersAnswer) {
        if (error) {
            console.log(`Returning early from answer submit b/c answer is blank or not a number.`);
            return -1
        }
        setAnswerFeedBack(answerIsCorrect ? "Correct!" : `Nope. It was ${correctAnswer}`)
        setTimeout(() => {
            setPlayersAnswer("")
            setHeaderText(instructions)
        }, 2000);

        console.log(`answerIsCorrect: ${answerIsCorrect} `)
        handleAnswerSubmit(answerIsCorrect)
        setPlayersAnswer("")
    }

    return (
        <Dialog 
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
                key={1}  // May be able to use key prop to force state reset to initial.
                headerText={headerText}
            />
            <QuestionEquation 
                equationString={equationString}
            />
            <AnswerInputComponent 
                question={question}
                handlePlayersAnswerChange={handlePlayersAnswerChange}
                handlePlayersAnswerSubmit={handlePlayersAnswerSubmit}
            />
        </Dialog>
    )

    
    
    function HeaderText(props) {
        const { instructions, answerFeedBack } = props
        let headerText = (answerFeedBack !== null) ? instructions : answerFeedBack
        
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
                {headerText}
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
        const { question, 
            handlePlayerAnswerSubmit, 
            handlePlayerAnswerChange } = props
        
        
        const answerInputType = getInputType(question)

        if (answerInputType === "textField") {
            return (
                <NumericalTextInput
                    handlePlayersAnswerSubmit={handlePlayersAnswerSubmit}
                />
            )
        }
        else if (answerInputType === "compareButtons") {
            return (
                <CompareButtons 
                    handlePlayersAnswerSubmit={handlePlayersAnswerSubmit}
                />
            )
        }
        else {
            console.log(`getInputComponent failed. Invalid answerInputType: ${answerInputType}`)
        }

        function NumericalTextInput(props) {
            const { handlePlayersAnswerSubmit } = props
            

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
                                    handlePlayersAnswerSubmit(answerIsCorrect)
                                }
                            }}
                        />
                        {/* <FormHelperText 
                            label={(error === false) ? "" : "Enter a whole number"}
                        /> */}
                        <SubmitButton
                            disabled={error}
                            playersAnswer={playersAnswer}
                            handlePlayersAnswerSubmit={handlePlayersAnswerSubmit}
                            

                        />
                    </FormControl>
                </Box>


            )
        }
        function SubmitButton(props) {
            const { answer, handleAnswerSubmit } = props
            return (
                <Button
                    onClick={() => handlePlayersAnswerSubmit(answerIsCorrect)}
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


