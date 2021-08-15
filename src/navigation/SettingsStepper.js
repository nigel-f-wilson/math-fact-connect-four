import React from 'react'
import { Link as RouterLink } from "react-router-dom";


// MY components
import { DesktopSettingsStepper } from "./DesktopSettingsStepper";

// MUI components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

//  MUI Icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


// SettingsDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.object.isRequired,
// }
export function SettingsStepper(props) {
    // const { onClose, selectedValue, dialogOpen } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [completedSteps, setCompletedSteps] = React.useState(new Array());

    const [playMode, setPlayMode] = React.useState("unset");
    const [botDifficulty, setBotDifficulty] = React.useState("unset");
    // const [playWithTimeLimit, setPlayWithTimeLimit] = React.useState(false);  // only an option in human vs. human mod
    const [questionType, setQuestionType] = React.useState("unset");  // none | multiplication | division | exponents | algebra
    const [rowNumbers, setRowNumbers] = React.useState([1, 2, 3, 4, 5, 6]);
    const [colNumbers, setColNumbers] = React.useState([1, 2, 3, 4, 5, 6, 7]);

    const goToNextStep = () => {  
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const goBackOneStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    const selectPlayMode = (selection) => {
        setCompletedSteps(completedSteps.concat(0))
        setPlayMode(selection)   // ENUM: 'human' | 'bot'
        console.log(`PlayMode set to ${selection}`)
    }
    // const selectHuman = () => {
    //     setCompletedSteps(1)
    //     setPlayMode('human')
    //     console.log(`PlayMode set to HUMAN`)
    // }
    // const selectBot = () => {
    //     setCompletedSteps(1)
    //     setPlayMode('bot');
    //     console.log(`PlayMode set to BOT`)
    // }
    const selectMultiplication = () => {
        setCompletedSteps(2)
        setQuestionType('multiplication')
    }
    const selectDivision = () => {
        setCompletedSteps(2)
        setQuestionType('division')
    }
    const selectExponents = () => {
        setCompletedSteps(2)
        setQuestionType('exponents')
    }
    const selectAlgebra = () => {
        setCompletedSteps(2)
        setQuestionType('algebra')
    }
    const selectNone = () => {
        setCompletedSteps(2)
        setQuestionType('none')
    }
    const selectQuestionType = (questionType) => {
        setCompletedSteps(2)
        setQuestionType(questionType)
    }

    
    return (
        <Box sx={{ bgcolor: 'white', height: 'inherit' }}   >
            <DialogContent sx={{ display: { xs: 'none', sm: 'block' }, p: '3 0 0' }} >
                <DesktopSettingsStepper />
            </DialogContent>
            <DialogContent sx={{ display: { xs: 'flex', sm: 'none' }, p: 0, height: 'inherit', justifyContent: 'center', alignContent: 'center' }}>
                <MobileSettingsStepper />
            </DialogContent>
        </Box>
    );
}

    

    function MobileSettingsStepper(props) {
        const { activeStep, completedSteps, mobileScreenSize } = props;

        console.log(`activeStep set to ${activeStep}`)
        console.log(`completedSteps set to ${completedSteps}`)
        console.log(`mobileScreenSize set to ${mobileScreenSize}`)

        
        const steps = [
            {
                label: 'Play vs. Human or Bot?',
                buttons: <SetPlayModeButtons />,
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
            // {
            //     label: 'What type of math questions should be asked?',
            //     buttons: <Set
            // },
        ];
        const maxSteps = steps.length;

        
        
    }


