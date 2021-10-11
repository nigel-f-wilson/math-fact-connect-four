import React from 'react'


import '../App.css';

// MY  components
import { CompareButtons } from "./buttons/CompareButtons";

// MUI  components
import { Box, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Zoom, TextField, Typography } from '@material-ui/core'
import { height, width } from '@material-ui/system'

// Style & Layout Constants

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function MathQuestionModal(props) {
    let { playMode, questionType, open, closeQuestionModal, inputType, boardAreaSideLength  } = props

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
    
    function DialogHeader(props) {
        return (
            <Box>
                <Typography 
                    variant='h3'
                    align='center' 
                >
                    Compare
                </Typography>
            </Box>
        )
    }
    
    
    
    return (
        <Dialog keepMounted
            disableEscapeKeyDown
            open={open}
            onClose={closeQuestionModal}  // Callback fired when the component requests to be closed.
            onBackdropClick={() => {}}
            aria-describedby="alert-dialog-slide-description"
            // PaperComponent="RoundPaper"
            TransitionComponent={Transition}
            sx={{
                height: boardAreaSideLength,
                width: boardAreaSideLength,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            
        >
            <DialogHeader />

            {/* <MathQuestion /> */}
            {/* <AnswerInput /> */}
            
            
            <DialogActions>
                
                {input}
                <Button onClick={closeQuestionModal}>Agree</Button>
                
            </DialogActions>
        </Dialog>
    )
}
