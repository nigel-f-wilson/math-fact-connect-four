import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"



// MUI  components
import { Typography, Container } from '@material-ui/core'
import { Button } from '@material-ui/core'




export default function CancelButton() {

    return (
        <Button
            variant='contained'
            color="error"
            component={RouterLink}
            to='/'
        >
            Cancel
        </Button>
    );
}