// NewGAmeButton opens the SettingsDialog

import React from 'react'


// MY components
import SettingsDialog from "../settings/SettingsDialog";

// MUI components
import Button from '@material-ui/core/Button';


export default function NewGameButton() {
    const [open, setOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };

    return (
        <React.Fragment >
            <Button variant="outlined" onClick={handleClickOpen}>
                New Game
            </Button>
            <SettingsDialog
                // selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </React.Fragment>
    );
}


