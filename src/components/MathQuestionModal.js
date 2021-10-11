import React from 'react'


import '../App.css';

// MY  components

// MUI  components
import { Box, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Zoom } from '@material-ui/core'
import { height, width } from '@material-ui/system'

// Style & Layout Constants

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    let { playMode, questionType, open, closeQuestionModal } = props

    
    return (
        <Dialog keepMounted
            open={open}
            onClose={closeQuestionModal}  // Callback fired when the component requests to be closed.
            aria-describedby="alert-dialog-slide-description"
            // PaperComponent="RoundPaper"
            TransitionComponent={Transition}
        >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeQuestionModal}>Disagree</Button>
                <Button onClick={closeQuestionModal}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}
