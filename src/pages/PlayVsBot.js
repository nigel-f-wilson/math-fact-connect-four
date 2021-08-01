import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"



// MUI  components
import { Typography, Container } from '@material-ui/core'


export default function PlayVsBot() {

    return (
        <Container maxWidth="md">
            <Typography color="text.primary" variant="h1">
                Welcome to the PlayVsBot Page
            </Typography>
        </Container>
    );
}