import React from 'react'
import { Link as RouterLink } from "react-router-dom";

import { useScreenWidth } from "../hooks";

// MY components

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser, faPlus, faTimes, faDivide, faSuperscript } from '@fortawesome/free-solid-svg-icons'

// MUI  components
import { Box, Button, Typography, Container, Divider,  Stack } from '@material-ui/core';


const RobotIcon = () => { return <FontAwesomeIcon icon={faRobot} /> }
const UserIcon = () => { return <FontAwesomeIcon icon={faUser} /> }
const PlusIcon = () => { return <FontAwesomeIcon icon={faPlus} /> }
const TimesIcon = () => { return <FontAwesomeIcon icon={faTimes} /> }
const DivideIcon = () => { return <FontAwesomeIcon icon={faDivide} /> }
const SuperscriptIcon = () => { return <FontAwesomeIcon icon={faSuperscript} /> }



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
            alignItems: 'center',
            }} 
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
    let width = useScreenWidth()
    const buttonWidth = '47%'

    const { opponent, clickHandler } = props
    
    return (
        <Box 
            sx={{
                width: '100%',
                padding: '1rem 0', 
                display: 'flex',
                justifyContent: 'space-around',
                borderBottom: 'solid #333 1px'
            }}
        >
            <Button
                startIcon={<UserIcon />}
                variant={'contained'}
                onClick={() => clickHandler("human")}
                color={opponent === "human" ? 'primary' : 'secondary'}
                children={width <= 600 ? 'vs. Human' : 'Play vs. Human'}
                sx={{
                    width: buttonWidth,
                }}
            >
            </Button>
            <Button
                startIcon={<RobotIcon />}
                variant={'contained'}
                onClick={() => clickHandler("bot")}
                color={opponent === "bot" ? 'primary' : 'secondary'}
                sx={{
                    width: buttonWidth,
                }}
                children={width <= 600 ? 'vs. Bot' : 'Play vs. Bot'}
            >
                
            </Button>
        </Box>
        

    );
}
