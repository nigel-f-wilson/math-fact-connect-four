import React from 'react'
import { Link as RouterLink } from "react-router-dom";

// MY components

// MY icons
import { HomeIcon, RobotIcon, CoffeeIcon, UserIcon, UserFriendsIcon } from "../icons";
// import SettingsIcon from '@mui/icons-material/Settings';


// MUI  components
import { Box, Button, Typography, Container, SvgIcon } from '@material-ui/core';


export default function WelcomePage() {
    const [opponent, setOpponent] = React.useState('human') // Select 'human' or 'bot' .
    const [mathTopics, setMathTopics] = React.useState({
        'combining': true,
        'multiplying': true,
        'fractions': false,
        'exponents': false,
        'algebra': false,
    })
    // Step 2: answer input types. Select from 'text field', 'compare buttons',  
    // const [answerInputFormats, setAnswerInputFormats] = React.useState(['text field', 'compare buttons'])
    // step 3: set time limit (optional)
    // const [timeLimit, setTimeLimit] = React.useState(30)  // "Off" or a number of seconds up to 180 

    function handleOpponentClick(selection) {
        if (opponent !== selection) {
            setOpponent(selection)
        }
    }
    
    return (
        <Container maxWidth='sm' sx={{ 
            width: '100%', 
            height: '100%',
            p: '1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'}} 
        >
            {/* <Typography color="text.primary" variant="h5" gutterBottom align='center' >
                Welcome to
            </Typography> */}
            <Typography color="text.primary" variant="h2" gutterBottom align='center' >
                Math Fact<br/>Connect Four
            </Typography>
            <Typography color="text.primary" variant="body1" gutterBottom align='center' >
                Two players (or teams) take turns dropping chips. 
                Get four consecutive chips in any row, column, or diagonal to win!  
                If you incorrectly answer the math question that pops-up and your turn will be skipped. 
            </Typography>
            
            <OpponentSelector opponent={opponent} clickHandler={handleOpponentClick} />
            
            
            
            
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

function OpponentSelector(props) {
    const { opponent, clickHandler } = props
    
    return (
        <Box 
            sx={{ 
                border: 'solid red 1px', 
                display: 'flex', 
                flexDirection: 'column', 
                flex: '0 1 15%', 
                width: '100%' }} 
        >
            <Button
                // className={`${classes.button} ${props.difficultyMode === "easy" ? classes.selectedButton : classes.unselectedButton} `}
                variant={'contained'}
                onClick={() => clickHandler("human")}
                color={opponent === "human" ? 'primary' : 'secondary'}
            >
            </Button>
            <Button
                startIcon={<RobotIcon />}
                variant={'contained'}
                onClick={() => clickHandler("bot")}
                color={opponent === "bot" ? 'primary' : 'secondary'}
            >
                Medium
            </Button>

            {/* <FormControl component="fieldset">
                <RadioGroup
                    aria-label="opponent"
                    defaultValue="human"
                    name="radio-buttons-group"
                    value={opponent}
                    onChange={(event, value) => { setOpponent(value) }}
                >
                    <FormControlLabel control={<Radio />} value="human" label="Human vs. Human Mode" />
                    <FormControlLabel control={<Radio />} value="bot" label="Human vs. Bot Mode " />
                </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <BackButton disabled />
                <NextButton />
            </Box> */}
        </Box>
    );
}
