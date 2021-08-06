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
                Play Classic Connect Four with a twist! Select the column you'd like to drop a chip in 
                and a math question will pop up. Answer correctly and your move goes through as planned, 
                answer incorrectly and you lose your turn. The first player (or team) to get four 
                consecutive chips in any row, column, or diagonal wins!
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                This game can be used to practice multiplication and division facts, rules of exponents, 
                and basic algebra. You can play in human vs. human mode on a shared device or play against a bot.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }} >
                <NewGameButton />
            </Box>

            <Typography color="text.primary" variant="body1" gutterBottom >
                I want to thank my students at College Track, the Waldorf School of New Orleans, and Bricolage Academy
                for inspiring me to create this game and helping me to test and improve it. This game was originally played
                using laminated cards hung on the wall. My students enthusiasm for the game made me want to share it
                with other teachers and classes but making sets of the cards and the grid to hang them from was quite time
                consuming. I decided to remake this game as a free online app so it can reach as many kids as possible
                and hopefully put a little bit of joy back into the practicing math foundations.
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                The code for this project is open-source so if your are curious how it works behind the scenes just visit my GitHub page.
                If you find a mistake or have an idea for how to improve this game, please open an issue.
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                A production of the NOLA STEM Garden &copy;
            </Typography>
        </Container>
    );
}

