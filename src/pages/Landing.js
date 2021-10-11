import React from 'react'

// MY components
import NewGameButton from "../navigation/NewGameButton";

// MUI  components
import { Box, Typography, Container } from '@material-ui/core';

export default function Landing() {
    return (
        <Container maxWidth='md' sx={{ width: '100%', p: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <Typography color="text.primary" variant="h5" gutterBottom align='center' >
                Welcome to
            </Typography>
            <Typography color="text.primary" variant="h2" gutterBottom align='center' >
                Math Fact<br/>Connect Four
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom >
                Practice arithmetic foundations while playing Connect Four!
                Play solo, with a partner, or with a whole class split into teams. 
                Select a column and a math question will pop up. 
                Answer correctly and your move gets made as planned, 
                answer incorrectly and your turn is skipped. First to get four 
                consecutive chips in any row, column, or diagonal wins!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }} >
                <NewGameButton />
            </Box>

            
            {/* <Typography color="text.primary" variant="body1" >
                A production of the NOLA STEM Garden &copy;
            </Typography> */}
        </Container>
    );
}

