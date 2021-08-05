import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"

// MY components
import NewGameButton from "../navigation/NewGameButton";

// MUI  components
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core'

export default function Landing() {

    return (
        <Container maxWidth="md" sx={{ pt: '1rem' }}>
            <Typography color="text.primary" variant="h2" gutterBottom >
                Welcome to Math Fact Connect Four!
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                You can play in human vs. human mode on a shared device or play against a bot. <br />
                This game can be used to practice foundational multiplication and division facts, 
                rules of exponents, and basic algebra. 
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                Once you select which column you'd like to drop a chip in, a math question will pop up.
                Answer correctly and your move goes through as planned, answer incorrectly and you lose your turn. 
                The first player (or team) to get four consecutive chips in any row, column, or diagonal wins! 
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: '1rem' }} >
                <NewGameButton />
            </Box>
            
        </Container>
    );
}

