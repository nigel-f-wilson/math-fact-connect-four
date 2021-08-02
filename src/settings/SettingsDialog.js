import React from 'react'
import PropTypes from 'prop-types';


// MY components
import SettingsStepper from "./SettingsStepper";

// MUI components
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const emails = ['username@gmail.com', 'user02@gmail.com'];


SettingsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SettingsDialog(props) {
    const { onClose, selectedValue, open } = props;
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Container maxWidth="sm">
            <Dialog 
                onClose={handleClose} 
                open={open}
                fullScreen={fullScreen}
                >
                <DialogTitle sx={{ maxWidth: 'calc(100% - 2rem)', padding: '1rem' }}  >
                    What kind of game do you want to play?
                </DialogTitle>
                
                <DialogContent>
                    <SettingsStepper />


                </DialogContent>
            </Dialog>
        </Container>
    );
}
