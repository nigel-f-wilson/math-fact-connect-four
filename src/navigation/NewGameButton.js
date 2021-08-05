import React from 'react'
import PropTypes from 'prop-types';


// MY components
import { MobileSettingsStepper } from "./MobileSettingsStepper";
import { DesktopSettingsStepper } from "./DesktopSettingsStepper";

// MUI components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// MUI icons
import CloseIcon from '@material-ui/icons/Close';

export default function NewGameButton() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    
    
    // const [selectedValue, setSelectedValue] = React.useState({
    //     opponent: "human",
    //     difficulty: "hard"
    // });

    const handleOpenDialog = () => { setDialogOpen(true) }
    const handleCloseDialog = () => { setDialogOpen(false) }

    return (
        <React.Fragment >
            <Button variant="contained" onClick={handleOpenDialog}>
                New Game
            </Button>
            <SettingsDialog
                sx={{  }}
                dialogOpen={dialogOpen}
                onClose={handleCloseDialog}
            />
        </React.Fragment>
    );
}

// SettingsDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.object.isRequired,
// }
function SettingsDialog(props) {
    const { onClose, selectedValue, dialogOpen } = props;
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog
            onClose={onClose}
            open={dialogOpen}
            fullScreen={fullScreen}
        >
            <CloseIcon
                sx={{ margin: '1rem 1rem 0 auto' }}
                onClick={() => onClose()}
            />

            <DialogTitle sx={{ padding: '1rem' }}  >
                What kind of game do you want to play?
            </DialogTitle>

            <DialogContent sx={{ display: { xs: 'none', md: 'block' } }} >
                <DesktopSettingsStepper  />
            </DialogContent>
            <DialogContent sx={{ display: { xs: 'block', md: 'none' } }}>
                <MobileSettingsStepper  />
            </DialogContent>
        </Dialog>
    );
}



