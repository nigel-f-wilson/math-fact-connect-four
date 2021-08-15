import React from 'react'
import { Link as RouterLink } from "react-router-dom";


// MY components
import { MobileSettingsStepper } from "./MobileSettingsStepper";
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
    const { onClose, selectedValue, dialogOpen } = props;
    const theme = useTheme()
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

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



