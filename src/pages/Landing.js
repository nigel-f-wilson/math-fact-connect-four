import React from 'react'

// MY components
import NewGameButton from "../navigation/NewGameButton";

// MUI  components
import { Box, Typography, Container } from '@material-ui/core';

export default function Landing() {
    return (
        <Container maxWidth='md' sx={{ width: '100%', p: '1rem'}}>
            <Typography color="text.primary" variant="h2" gutterBottom >
                Welcome to Math Fact Connect Four!
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                Practice foundational math facts while playing Connect Four! 
                Great for individual practice or for use with a whole class split into teams. 
                Simply select the column you'd like to drop a chip in and a math question will pop up. 
                Answer correctly and your move gets made as planned, 
                answer incorrectly and your turn is skipped. The first player (or team) to get four 
                consecutive chips in any row, column, or diagonal wins!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }} >
                <NewGameButton />
            </Box>

            <Typography color="text.primary" variant="h4" gutterBottom >
                Thanks
            </Typography>
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

