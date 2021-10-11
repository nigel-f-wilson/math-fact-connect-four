import React from 'react'


import '../App.css';

// MY  components
import { CompareButtons } from "./buttons/CompareButtons";

// MUI  components
import { Box, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Zoom, TextField } from '@material-ui/core'
import { height, width } from '@material-ui/system'

// Style & Layout Constants

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    let { playMode, questionType, open, closeQuestionModal, inputType,  } = props

    let input = null
    switch (inputType) {
        case 'textField':
            console.log('This modal has a text field');
            input = <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            break;
        case 'compareButtons':
            console.log('This modal has compare buttons < >  =.')
            // input = <CompareButton onClick={closeQuestionModal}>Disagree</Button>
            input = <Button onClick={closeQuestionModal}>Disagree</Button>
            break;
        default:
            console.error(`MathQuestionModal called with invalid questionType`);
    }
    
    return (
        <Dialog keepMounted
            open={open}
            onClose={closeQuestionModal}  // Callback fired when the component requests to be closed.
            aria-describedby="alert-dialog-slide-description"
            // PaperComponent="RoundPaper"
            TransitionComponent={Transition}
            sx={{
                height: '80%'
            }}
        >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                
                {input}
                <Button onClick={closeQuestionModal}>Agree</Button>
                
            </DialogActions>
        </Dialog>
    )
}
