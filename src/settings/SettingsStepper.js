import * as React from 'react';

// MY components
import { PlayVsHuman, PlayVsBot } from "./PlayModeButtons";

// MUI components
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const steps = [
    {
        label: 'Play vs. Human or Bot?',
        description: '',
        buttons: [<PlayVsHuman setPlayMode={setPlayMode} />, <PlayVsBot setPlayMode={setPlayMode} />,]

    },
    {
        label: 'How well should the bot play?',
        description:
            'Easy, Medium, and Hard Modes',
        buttons: []
    },
    {
        label: 'What kind of math problems?',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
        buttons: []
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function SettingsStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [playMode, setPlayMode] = React.useState("human");
    const [difficultyMode, setDifficultyMode] = React.useState("easy");
    // const [playWithTimeLimit, setPlayWithTimeLimit] = React.useState(false);  // only an option in human vs. human mod
    const [problemType, setProblemType] = React.useState("none");  // none | multiplication | division | exponents | algebra
    const [rowNumbers, setRowNumbers] = React.useState([]);
    const [colNumbers, setColNumbers] = React.useState([]);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key={step.label}>
                    <StepLabel>
                        <Typography variant="caption">Last step</Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <PlayVsHumanButton
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

function EasyButton(props) {
    
}