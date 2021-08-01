import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"



// MUI  components
import { Typography, Container } from '@material-ui/core'




export default function Rules() {

    return (
        <Container maxWidth="md">
            <Typography color="text.primary" variant="h1">
                Welcome to the Rules Page
            </Typography>
        </Container>
    );
}