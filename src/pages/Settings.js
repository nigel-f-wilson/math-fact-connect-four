import React from 'react'
import { Link as RouterLink } from "react-router-dom";

// MY components

// MUI components
import { Box, Button, Typography, Container } from '@material-ui/core';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { FormControlLabel, FormHelperText, FormGroup, FormControl } from '@material-ui/core';
import { Radio, RadioGroup, Checkbox, Slider, Switch } from '@material-ui/core';

//  MUI Icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function SettingsPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    
    // Step 0: select opponent: vs human or vs bot
    const [opponent, setOpponent] = React.useState('human') // Select 'human' or 'bot' .
    // Step 1: math topics included. 
    const [mathTopics, setMathTopics] = React.useState({
        'combining': true,     
        'multiplying': true,   
        'fractions': false,
        'exponents': false,
        'algebra': false,
    })
    // Step 2: answer input types. Select from 'text field', 'compare buttons',  
    // const [answerInputFormats, setAnswerInputFormats] = React.useState(['text field', 'compare buttons'])
    // step 3: set time limit (optional)
    const [timeLimit, setTimeLimit] = React.useState(30)  // "Off" or a number of seconds up to 180 

    
    const steps = [
        {
            label: "Select Opponent",
            description: "You can play either in Human vs. Human mode on a shared device or play against the Bot.",
            content: <OpponentSelector />
        },
        {
            label: "Select Math Topics to Practice",
            // description: "Select the math topics you would like to practice with.",
            content: <MathTopicSelector />
        },
        // {
        //     label: "Select Question Formats",
        //     description: "By default, some questions will have a text field to input your answer and others will simply have you click a button. You can disable one type or the other here. ",
        //     content: <CheckboxesGroup />
        // },
        {
            label: "Set Time Limit",
            description: "You can set a time limit for answering math question in 10 second increments. Setting this to zero will disable the timer.",
            content: <TimeLimitSelector />
        },
    ]
    
    const BackButton = (props) => {
        return (
            <Button
                disabled={props.disabled}
                variant="outlined"
                onClick={() => { 
                    setActiveStep((prevActiveStep) => prevActiveStep - 1)}}
                sx={{ m: 1 }}
            >
                <ArrowBackIosIcon fontSize='small' />&ensp;Back
            </Button>
        )
        
    }
    const NextButton = (props) => {
        const { index } = props
        return (
            <Button
                disabled={props.disabled}
                variant="outlined"
                onClick={() => { 
                    setActiveStep((prev) => prev + 1) }}
                sx={{ m: 1 }}
            >
                Next&ensp;<ArrowForwardIosIcon fontSize='small' />
            </Button>
        )
    }
    const StartGameButton = (props) => {
        return (
            <Button
                disabled={props.disabled}
                variant="outlined"
                component={RouterLink}
                to={{
                    pathname: '/play',
                    state: { 
                        'opponent': opponent,
                        'mathTopics': mathTopics,
                        'timeLimit': timeLimit,
                    }
                }}
                // onClick={() => {
                //     console.log(`START GAME`);
                //     console.log(`Opponent: ${opponent}`);
                //     console.log(`MathTopics: ${Object.keys(mathTopics).filter(key => mathTopics[key] === true)}`);
                //     console.log(`TimeLimit: ${timeLimit}`);
                // }}
                sx={{ m: 1 }}
            >
                Start Game!
            </Button>
        )
    }
    
    function OpponentSelector() {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="opponent"
                        defaultValue="human"
                        name="radio-buttons-group"
                        value={opponent}
                        onChange={(event, value) => { setOpponent(value) }}
                    >
                        <FormControlLabel control={<Radio />} value="human" label="Human vs. Human Mode" />
                        <FormControlLabel control={<Radio />} value="bot" label="Human vs. Bot Mode " />
                    </RadioGroup>
                </FormControl>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <BackButton disabled  />
                    <NextButton  />
                </Box>
            </Box>
        );
    }
    
    function MathTopicSelector() {
        const noneSelectedError = Object.values(mathTopics).filter((v) => v).length === 0;
        function getSwitchLabel(key) {
            // console.log(`getSwitchLabel called with key: ${key} `);
            if (key === "combining") {
                return "Addition & Subtraction"
            }
            else if (key === "multiplying") {
                return "Multiplication & Division"
            }
            else if (key === "fractions") {
                return "Fractions"
            }
            else if (key === "exponents") {
                return "Exponents"
            }
            else if (key === "algebra") {
                return "Algebra"
            }
            else {
                return "error"
            }
        }
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl
                    error={noneSelectedError}
                    component="fieldset"
                    sx={{ m: 1 }}
                    variant="standard"
                >
                    <FormGroup>
                        {Object.entries(mathTopics).map(keyValuePair => {
                            let key = keyValuePair[0]
                            let value = keyValuePair[1]
                            return (
                                <FormControlLabel
                                    key={key}
                                    control={
                                        <Checkbox name={key}
                                            checked={value} 
                                            onChange={(event) => setMathTopics({ ...mathTopics, [event.target.name]: event.target.checked })}
                                        />
                                    }
                                    label={getSwitchLabel(key)}
                                />
                            )
                        })}
                    </FormGroup>
                    <FormHelperText>Select at least one topic.</FormHelperText>
                </FormControl>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <BackButton />
                    <NextButton disabled={noneSelectedError} />
                </Box>
            </Box>
        )
    }

    function TimeLimitSelector() {
        // let localValue = timeLimit
        function valuetext(timeLimit) {
            return (timeLimit === 0) ? 'Off' : `${timeLimit} seconds`;
        }
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Box sx={{ width: '100%', mt: 5 }}>
                    <Slider
                        value={timeLimit}
                        name="Time limit selector"
                        aria-label="Time limit selector"
                        getAriaValueText={valuetext}
                        valueLabelDisplay="on"
                        step={10}
                        marks
                        min={0}
                        max={180}
                        valueLabelFormat={(value) => (value === 0) ? 'Off' : `${value} seconds`}
                        onChangeCommitted={(event, value) => { setTimeLimit(value) }}
                    />
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <BackButton />
                    <StartGameButton />
                </Box>
            </Box>
        );
    }
    
    return (
        <Box sx={{ bgcolor: 'background', height: '100%', width: '100%', mt: '1rem' }}  >
            <Container sx={{ height: '100%'}} maxWidth='sm' >
                <Stepper activeStep={activeStep}
                    orientation='vertical' 
                >
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                <Typography variant='h6' >
                                    {step.label}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography>
                                    {step.description}
                                </Typography>
                                {step.content}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Container>
        </Box>
    )
}

// function EnterPlayerNamesStep(props) { }
// function SetTimeLimitStep(props) { }





