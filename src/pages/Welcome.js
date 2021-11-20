import React from 'react'
import { Link as RouterLink } from "react-router-dom";

// MY components

// MUI  components
import { Box, Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';


export default function WelcomePage() {
    return (
        <Container maxWidth='sm' sx={{ 
            width: '100%', 
            height: '100%',
            p: '1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'}} 
        >
            <Typography color="text.primary" variant="h5" gutterBottom align='center' >
                Welcome to
            </Typography>
            <Typography color="text.primary" variant="h2" gutterBottom align='center' >
                Math Fact<br/>Connect Four
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom align='center' >
                Practice arithmetic foundations while playing Connect Four!
                Play solo, with a partner, or with a whole class split into teams. 
                Correctly answer the math question in the pop-up and your move is made
                as planned, answer incorrectly and your turn is skipped. First to get four 
                consecutive chips in any row, column, or diagonal wins!
            </Typography>
            <Button variant="contained" 
                component={RouterLink}
                to='/settings'
                sx={{ m: 1 }}
            >
                Play Now!
            </Button>
            
            
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }} >
                <NewGameButton />
            </Box> */}

            
            {/* <Typography color="text.primary" variant="body1" >
                A production of the NOLA STEM Garden &copy;
            </Typography> */}
        </Container>
    );
}

