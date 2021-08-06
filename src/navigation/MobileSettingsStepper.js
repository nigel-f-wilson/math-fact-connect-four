import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink } from "react-router-dom";

// MY components

// MUI components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import SvgIcon from '@material-ui/core/SvgIcon';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//  MUI Icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export function MobileSettingsStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completedSteps, setCompletedSteps] = React.useState(-1);

    const [playMode, setPlayMode] = React.useState("");
    const [botDifficulty, setBotDifficulty] = React.useState("");
    // const [playWithTimeLimit, setPlayWithTimeLimit] = React.useState(false);  // only an option in human vs. human mod
    const [questionType, setQuestionType] = React.useState("");  // none | multiplication | division | exponents | algebra
    const [rowNumbers, setRowNumbers] = React.useState([1, 2, 3, 4, 5, 6]);
    const [colNumbers, setColNumbers] = React.useState([1, 2, 3, 4, 5, 6, 7]);


    const steps = [
        {
            label: 'Play vs. Human or Bot?',
            buttons: <SetPlayModeButtons/>,
        },
        // {
        //     label: 'How well should the Bot play?',
        // },
        // {
        //     label: "What are the players' names?",
        // },
        {
            label: 'What type of math questions should we ask?',
            buttons: <SetQuestionTypeButtons />,

        },
        {
            label: 'What type of math questions should be asked?',
        },
    ];
    const maxSteps = steps.length;


    const goToNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const goBackOneStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    const selectHuman = () => {
        setCompletedSteps(0)
        setPlayMode('human')
        console.log(`PlayMode set to HUMAN`)
    }
    const selectBot = () => {
        setCompletedSteps(0)
        setPlayMode('bot');
        console.log(`PlayMode set to BOT`)
    }
    const selectMultiplication = () => {
        setCompletedSteps(1)
        setQuestionType('multiplication')
    }
    const selectDivision = () => {
        setCompletedSteps(1)
        setQuestionType('division')
    }
    const selectExponents = () => {
        setCompletedSteps(1)
        setQuestionType('exponents')
    }
    const selectAlgebra = () => {
        setCompletedSteps(1)
        setQuestionType('algebra')
    }
    const selectNone = () => {
        setCompletedSteps(1)
        setQuestionType('none')
    }
    const selectQuestionType = (questionType) => {
        setCompletedSteps(1)
        setQuestionType(questionType)
    }

    

    return (
        <Box sx={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h4' textAlign="center" sx={{ mb: 6 }} >
                {steps[activeStep].label}
            </Typography>
            <Typography variant='h4' textAlign="center"   >
                {`Active: ${activeStep}`}
            </Typography>
            <Typography variant='h4' textAlign="center"   >
                {`Completed: ${completedSteps}`}
            </Typography>

            {steps[activeStep].buttons}
            
            
            
            <MobileStepper 
                activeStep={activeStep}
                variant="dots"
                steps={steps.length}
                position="bottom"
                nextButton={<NextButton />}
                backButton={<BackButton />}
                sx={{ }}
            >
                
            </MobileStepper>

        </Box>
    )

    ///////////////////////////////////////////////////////////////////////////////////////
    // Steps
    ///////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////
    // Selection Buttons
    ///////////////////////////////////////////////////////////////////////////////////////
    function SetPlayModeButtons(props) {
        return (
            <React.Fragment>
                <Button
                    onClick={selectHuman}
                    variant={playMode === 'human' ? "contained" : "outlined"}
                    startIcon={<i className="fas fa-user-friends"></i>}
                    size='large'
                    sx={{ m: 2, width: '60%'}}
                >
                    &ensp;Play vs. Human
                </Button>
                <Button
                    onClick={selectBot}
                    variant={playMode === 'bot' ? "contained" : "outlined"}
                    startIcon={<i className='fas fa-robot'></i>}
                    sx={{ m: 2, width: '60%' }}

                >
                    &ensp;Play vs. Bot
                </Button>
            </React.Fragment>    

        )
    }

    function SetQuestionTypeButtons(props) {
        // TODO ADD common IconButton reusable component to generate this set with .map instead of manually
        
        return (
            <React.Fragment>
                <Button
                    onClick={selectMultiplication}
                    variant={questionType === 'multiplication' ? "contained" : "outlined"}
                    startIcon={<i className="fas fa-times"></i>}
                    sx={{ m: 2, width: '60%' }}
                >
                    &ensp;multiplication
                </Button>
                {/* <Button
                    onClick={selectDivision}
                    variant={questionType === 'division' ? "contained" : "outlined"}
                    startIcon={<i className="fas fa-divide"></i>}
                    sx={{ m: 2, width: '60%' }}
                >
                    &ensp;division
                </Button> */}
                <Button
                    onClick={() => selectQuestionType('division')}
                    variant={questionType === 'division' ? "contained" : "outlined"}
                    startIcon={<i className="fas fa-divide"></i>}
                    sx={{ m: 2, width: '60%' }}
                >
                    &ensp;division
                </Button>
                <Button
                    onClick={selectExponents}
                    variant={questionType === 'exponents' ? "contained" : "outlined"}
                    startIcon={<i className="fas fa-superscript"></i>}
                    sx={{ m: 2, width: '60%' }}
                >
                    &ensp;exponents
                </Button>
                <Button
                    onClick={selectAlgebra}
                    variant={questionType === 'algebra' ? "contained" : "outlined"}
                    // startIcon={<i class="fal fa-function"></i>}
                    startIcon={<i className="fas fa-calculator"></i>}
                    sx={{ m: 2, width: '60%' }}
                >
                    &ensp;algebra
                </Button>
                <Button
                    onClick={selectNone}
                    variant={questionType === 'none' ? "contained" : "outlined"}
                    startIcon={<i className="fas fa-ban"></i>}
                    sx={{ m: 2, width: '60%' }}
                >
                    &ensp;none
                </Button>
            </React.Fragment>

        )
    }


                        // <SettingsStepperButton
                        //     label="Division"
                        //     onClick={() => {
                        //         setQuestionType("Division")
                        //         goToNextStep()
                        //     }}
                        // />
                        // <SettingsStepperButton
                        //     label="Exponents"
                        //     onClick={() => {
                        //         setQuestionType("Exponents")
                        //         goToNextStep()
                        //     }}
                        // />
                        // <SettingsStepperButton
                        //     label="Algebra"
                        //     onClick={() => {
                        //         setQuestionType("Algebra")
                        //         goToNextStep()
                        //     }}
                        // />
                        // <SettingsStepperButton
                        //     label="None"
                        //     onClick={() => {
                        //         setQuestionType("None")
                        //         goToNextStep()
                        //     }}
                        // />
                        // <BackButton />

    


    ///////////////////////////////////////////////////////////////////////////////////////
    // Navigation Buttons
    ///////////////////////////////////////////////////////////////////////////////////////    
    function BackButton(props) {
        return (
            <Button variant="text" 
                onClick={goBackOneStep}
                sx={{ color: 'primary.main', mt: 1, mr: 1, fontSize: 'large' }}
            >
                <ArrowBackIosIcon fontSize='small' />&ensp;Back
            </Button>
        )
    }
    function NextButton(props) {
        return (
            <Button variant="text"
                onClick={goToNextStep}
                sx={{ mt: 1, mr: 1 , fontSize: 'large' }}
                disabled={completedSteps < activeStep}
            >
                Next&ensp;<ArrowForwardIosIcon fontSize='small' />
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

    function SettingsStepperButton(props) {
        return (
            <Button
                variant="contained"
                onClick={props.setStateFunction(props.setting)}
                sx={{ mt: 1, mr: 1 }}
            >
                {props.startIcon}{props.label}
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
                            startIcon={"<i class='fas fa-robot'></i>"}
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


    function SelectQuestionTypeStep(props) {
        return (
            <Step index={2} key={"Select Type of Math Problem"}>
                <StepLabel>
                    <Typography variant="body1" >Select Type of Math Problem: </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} >{questionType.toUpperCase()}</Typography>
                </StepLabel>
                <StepContent>
                    <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                        <SettingsStepperButton
                            label="Multiplication"
                            onClick={() => {
                                setQuestionType("Multiplication")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Division"
                            onClick={() => {
                                setQuestionType("Division")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Exponents"
                            onClick={() => {
                                setQuestionType("Exponents")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Algebra"
                            onClick={() => {
                                setQuestionType("Algebra")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="None"
                            onClick={() => {
                                setQuestionType("None")
                                goToNextStep()
                            }}
                        />
                        <BackButton />

                    </Box>
                </StepContent>
            </Step>
        )
    }

    
    function EnterPlayerNamesStep(props) {
        return (
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
        )
    }

    function SetTimeLimitStep(props) {
        return (
            <Step index={2} key={"Select Type of Math Problem"}>
                <StepLabel>
                    <Typography variant="body1" >Select Type of Math Problem: </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} >{questionType.toUpperCase()}</Typography>
                </StepLabel>
                <StepContent>
                    <Box sx={{ mb: 2 }} display='flex' flexDirection='column' >
                        <SettingsStepperButton
                            label="Multiplication"
                            onClick={() => {
                                setQuestionType("Multiplication")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Division"
                            onClick={() => {
                                setQuestionType("Division")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Exponents"
                            onClick={() => {
                                setQuestionType("Exponents")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="Algebra"
                            onClick={() => {
                                setQuestionType("Algebra")
                                goToNextStep()
                            }}
                        />
                        <SettingsStepperButton
                            label="None"
                            onClick={() => {
                                setQuestionType("None")
                                goToNextStep()
                            }}
                        />
                        <BackButton />

                    </Box>
                </StepContent>
            </Step>
        )
    }


    


}
