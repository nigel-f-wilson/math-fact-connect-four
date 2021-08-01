import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"

// MY components
import NewGameButton from "../navigation/NewGameButton";

// MUI  components
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core'

export default function Landing() {

    return (
        <Container maxWidth="md">
            <Typography color="text.primary" variant="h1">
                Welcome to the Landing Page
            </Typography>
            <NewGameButton />

            {/* <Button
                variant='contained'
                color="primary"
                component={RouterLink}
                to='/game-settings'
            >
                New Game
            </Button> */}
        </Container>
    );
}

