

import React from 'react'

// MUI  components
import { Box, Button, Typography, Zoom, Dialog,  } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
})

export function WelcomeModal(props) {
    let { open,
        boardSideLength, 
        openSettingsModal } = props

    return (
        <Dialog
            open={open}
            aria-describedby="welcome dialog"
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth='md'
            PaperProps={{
                sx: {
                    height: `${0.85 * boardSideLength}px`,
                    width: `${0.7 * boardSideLength}px`,
                    minHeight: "550px",
                    minWidth: "375px",
                    borderRadius: '3rem',
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start',
                    display: 'flex',
                    justifyContent: 'stretch',
                    // alignItems: 'center',
                    px: 3,
                    py: 3
                }
            }}
        >
            
            <Typography variant='h3' align="center" >
                Welcome to Math Fact Connect Four!
            </Typography>
            <PlayNowButton openSettingsModal={openSettingsModal} />

            
            <Typography variant='h5' align="left"  >
                Rules of Play
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                Two players (or teams) take turns dropping chips.
                The first to get four consecutive chips in any row, column, or diagonal wins!
                But there's a catch, you must correctly answer the math question that pops-up or your turn will be skipped!
            </Typography>
            
            <Typography variant='h5' align="left" pt={1}  >
                Suggested Use
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                Learning math foundations takes a lot of practice. There is no substitute for repetition. 
                The goal of this project is to make doing all that repetitive practice a little less dull, 
                and a little more joyful.
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                All the questions in this game were designed to be solved mentally.
                Use your fingers if you have to! Just don't fall back to relying on the same boring old paper-and-pencil procedures.
                Push yourself to try new mental math strategies like "stepping stones" and "factor it first".
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                By default the questions increase in difficulty as the game progresses but you can also 
                set it to ask questions of only one difficulty level throughout the game. This is particularly 
                useful when working with younger students. 
            </Typography>

            <Typography variant='h5' align="left" pt={1}  >
                Note on Time Limits
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                Some students enjoy playing this game with a two-sided game timer (chess clock). 
                When doing this it is good to give each team about 10 minutes for the whole game.
                That said, there is no timer built into this game on purpose. Most students report 
                feeling anxious and having less fun, and answer questions less accurately when playing with a timer.
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                Accuracy is more imporatant than speed. 
                Starting out, your focus should be on getting questions right, on holding all the
                moving pieces in your mind. Accuracy results from focus, conceptual understanding, and effort.
                Speed is just a pleasant side-effect of getting lots of practice.
            </Typography>

            <Typography variant='h5' align="left" pt={1}  >
                Thanks
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                I want to thank my students at College Track, the Waldorf School of New Orleans, and Bricolage Academy
                for inspiring me to create this game and helping me to test and improve it. This game was originally played
                using laminated cards hung on the wall. It was my students' enthusiastic responses to this game that made me 
                want to convert it to a free web app so I could share it with other teachers and students.
            </Typography>

            <Typography variant='h5' align="left" pt={1}  >
                Dig Deeper
            </Typography>
            <Typography variant='body1' align="left" gutterBottom  >
                The code for this project is all open-source so if your are curious how it works behind the scenes just visit my GitHub page.
                If you find a mistake or have an idea for how to improve this game, please open an issue.
            </Typography>
            <Typography color="text.primary" variant="body1" >
                A production of the NOLA STEM Garden &copy;
            </Typography>
        </Dialog>
    )

    function PlayNowButton() {
        return (
            <Box m={3} sx={{ display: 'flex', justifyContent: "center" }} >
                <Button
                    onClick={openSettingsModal}
                    variant='contained'
                    sx={{
                        m: 1,
                        width: '66%'
                    }}
                    children="Start Game"
                />
            </Box>
            
        )
    }
}

