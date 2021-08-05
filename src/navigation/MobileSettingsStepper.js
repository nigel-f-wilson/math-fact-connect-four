import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink } from "react-router-dom";

// MY components

// MUI components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//  MUI Icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export function MobileSettingsStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [playMode, setPlayMode] = React.useState("");
    const [botDifficulty, setBotDifficulty] = React.useState("");
    // const [playWithTimeLimit, setPlayWithTimeLimit] = React.useState(false);  // only an option in human vs. human mod
    const [problemType, setProblemType] = React.useState("none");  // none | multiplication | division | exponents | algebra
    const [rowNumbers, setRowNumbers] = React.useState([1, 2, 3, 4, 5, 6]);
    const [colNumbers, setColNumbers] = React.useState([1, 2, 3, 4, 5, 6, 7]);



    const goToNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const goBackOneStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    return (
        <Box sx={{ width: 550 }}>
            {/* <Stepper
                activeStep={activeStep}
                orientation="vertical"
            >
                <SelectPlayModeStep />
                <SelectBotDifficultyStep />
                <SelectProblemTypeStep />
                <Step key={"Select Player Names"}>
                    <StepLabel>
                        <Typography variant="caption">Enter Player Names</Typography>
                    </StepLabel>
                    <StepContent>
                        <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                            <StartGameButton />
                            <BackButton />
                        </Box>
                    </StepContent>
                </Step>
            </Stepper> */}
            <MobileStepper activeStep={activeStep}
                variant="progress"
                steps={6}
                position="static"
                sx={{ maxWidth: 400, flexGrow: 1 }}
            >
            </MobileStepper>

        </Box>
    )

    function BackButton(props) {
        return (
            <Button variant="outlined" 
                startIcon={<ArrowBackIosIcon />}
                onClick={goBackOneStep}
                sx={{ mt: 1, mr: 1 }}
            >
                Back
            </Button>
        )
    }
    function NextButton(props) {
        return (
            <Button variant="outlined"
                startIcon={<ArrowForwardIosIcon />}
                onClick={goToNextStep}
                sx={{ mt: 1, mr: 1 }}
            >
                Next
            </Button>
        )
    }
    function StartGameButton(props) {
        return (
            <Button variant="outlined"
                startIcon={<ArrowBackIosIcon />}
                component={RouterLink}
                to={(props.playMode === "human") ? 'play-vs-human' : 'play-vs-bot' }
                onClick={goBackOneStep}
                sx={{ mt: 1, mr: 1 }}
            >
                Start Game!
            </Button>
        )
    }

    function SelectPlayModeStep(props) {
        return (
            <Step index={0} key={"Select Human Or Bot"}>
                <StepLabel>
                    <Typography variant="body1" >Select Human or Bot: </Typography>
                    <Typography sx={{ fontWeight: 'bold' }} >{playMode.toUpperCase()}</Typography>
                </StepLabel>
                <StepContent>
                    <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                        <SettingsStepperButton
                            label="Play vs. Bot"
                            onClick={() => {
                                setPlayMode("bot")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Play vs. Human"
                            onClick={() => {
                                setPlayMode("human")
                                goToNextStep()
                            }}
                        />
                        {/* <BackButton disabled /> */}
                    </Box>
                </StepContent>
            </Step>
        )
    }

    function SelectBotDifficultyStep(props) {
        return (
            <Step index={1}
                key={"Select Bot Difficulty"}
                disabled={(playMode === "human")}
            >
                <StepLabel>
                    <Typography variant="body1" >Select Bot Difficulty: </Typography>
                    <Typography sx={{ fontWeight: 'bold' }} >{botDifficulty.toUpperCase()}</Typography>
                </StepLabel>
                <StepContent>
                    <Typography>

                    </Typography>
                    <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                        <SettingsStepperButton
                            label="Easy"
                            onClick={() => {
                                setBotDifficulty("Easy")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Medium"
                            onClick={() => {
                                setBotDifficulty("Medium")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Hard"
                            onClick={() => {
                                setBotDifficulty("Hard")
                                goToNextStep()
                            }}
                        />
                        <BackButton />
                    </Box>
                </StepContent>
            </Step>
        )
    }


    function SelectProblemTypeStep(props) {
        return (
            <Step index={2} key={"Select Type of Math Problem"}>
                <StepLabel>
                    <Typography variant="body1" >Select Type of Math Problem: </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} >{problemType.toUpperCase()}</Typography>
                </StepLabel>
                <StepContent>
                    <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                        <SettingsStepperButton
                            label="Multiplication"
                            onClick={() => {
                                setProblemType("Multiplication")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Division"
                            onClick={() => {
                                setProblemType("Division")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Exponents"
                            onClick={() => {
                                setProblemType("Exponents")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Algebra"
                            onClick={() => {
                                setProblemType("Algebra")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="None"
                            onClick={() => {
                                setProblemType("None")
                                goToNextStep()
                            }}
                        />
                        <BackButton />

                    </Box>
                </StepContent>
            </Step>
        )
    }

    function SetTimeLimitStep(props) {
        return (
            <Step index={2} key={"Select Type of Math Problem"}>
                <StepLabel>
                    <Typography variant="body1" >Select Type of Math Problem: </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} >{problemType.toUpperCase()}</Typography>
                </StepLabel>
                <StepContent>
                    <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                        <SettingsStepperButton
                            label="Multiplication"
                            onClick={() => {
                                setProblemType("Multiplication")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Division"
                            onClick={() => {
                                setProblemType("Division")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Exponents"
                            onClick={() => {
                                setProblemType("Exponents")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Algebra"
                            onClick={() => {
                                setProblemType("Algebra")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="None"
                            onClick={() => {
                                setProblemType("None")
                                goToNextStep()
                            }}
                        />
                        <BackButton />

                    </Box>
                </StepContent>
            </Step>
        )
    }


    function SettingsStepperButton(props) {
        return (
            <Button
                variant="contained"
                onClick={props.onClick}
                sx={{ mt: 1, mr: 1 }}
            >
                {props.label}
            </Button>
        )
    }
    function StartGameButton(props) {
        return (
            <SettingsStepperButton
                label="Start Game!"
                onClick={goBackOneStep}
            />
        )
    }

    


}
