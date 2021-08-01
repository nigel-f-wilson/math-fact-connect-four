import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"



// MUI  components
import { Typography, Container } from '@material-ui/core'
import { Button } from '@material-ui/core'




export default function Landing() {

    return (
        <Container maxWidth="md">
            <Typography color="text.primary" variant="h1">
                Welcome to the Landing Page
            </Typography>
            <Button
                variant='contained'
                color="primary"
                component={RouterLink}
                to='/game-settings'
            >
                New Game
            </Button>
        </Container>
    );
}