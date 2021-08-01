import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"

// MY Components
import CancelButton from "../navigation/CancelButton"
import PlayNowButton from "../navigation/PlayNowButton"

// MUI  components
import { Typography, Container } from '@material-ui/core'



export default function Settings() {

    return (
        <Container maxWidth="md">
            <Typography color="text.primary" variant="h1">
                Welcome to the Settings Page
            </Typography>
            <Typography color="text.primary" variant="h2">
                Type of Math Questions
            </Typography>
            <Typography color="text.primary" variant="body1">
                Multiplication
            </Typography>
            <Typography color="text.primary" variant="body1">
                Division
            </Typography>


            <CancelButton />
            <PlayNowButton />
        </Container>
    );
}