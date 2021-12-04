import React from 'react'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser, faPlus, faTimes, faDivide, faSuperscript } from '@fortawesome/free-solid-svg-icons'

// MUI  components
import { Box, Grid, Button, Typography, Container } from '@material-ui/core';



const RobotIcon = () => { return <FontAwesomeIcon icon={faRobot} /> }
const UserIcon = () => { return <FontAwesomeIcon icon={faUser} /> }
const PlusIcon = () => { return <FontAwesomeIcon icon={faPlus} /> }
const TimesIcon = () => { return <FontAwesomeIcon icon={faTimes} /> }
const DivideIcon = () => { return <FontAwesomeIcon icon={faDivide} /> }
const SuperscriptIcon = () => { return <FontAwesomeIcon icon={faSuperscript} /> }



export default function WelcomePage() {
    const [opponent, setOpponent] = React.useState('human') // Select 'human' or 'bot' .
    const [mathTopics, setMathTopics] = React.useState([    // Select at least one topic
        'combining',
        'multiplying',
        // 'fractions',
        // 'exponents',
        // 'algebra',
    ])
    // Step 2: answer input types. Select from 'text field', 'compare buttons',  
    // const [answerInputFormats, setAnswerInputFormats] = React.useState(['text field', 'compare buttons'])
    // step 3: set time limit (optional)
    // const [timeLimit, setTimeLimit] = React.useState(30)  // "Off" or a number of seconds up to 180 

    function handleOpponentClick(selection) {
        if (opponent !== selection) {
            setOpponent(selection)
        }
    }
    function handleMathTopicClick(clickedTopic) {
        if (mathTopics.includes(clickedTopic)) {
            if (mathTopics.length > 1) {
                setMathTopics(mathTopics.filter(value => value !== clickedTopic))
            }
        }
        else {
            setMathTopics(mathTopics.concat(clickedTopic))
        }
    }
    
    return (
        <Container maxWidth='sm' sx={{ 
            width: '100%', 
            height: '100vh',
            p: '0.8rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            }} 
        >
            <Typography color="text.primary" variant="h2" gutterBottom align='center' >
                Math Fact<br/>Connect Four
            </Typography>
            <Typography color="text.primary" variant="body2" gutterBottom align='justify' >
                Two players (or teams) take turns dropping chips. 
                Get four consecutive chips in any row, column, or diagonal to win!  
                If you answer the math question that pops-up incorrectly your turn will be skipped.
            </Typography>
            
            <OpponentSelector opponent={opponent} clickHandler={handleOpponentClick} />
            
            <MathTopicSelector mathTopics={mathTopics} clickHandler={handleMathTopicClick} />
            
            <PlayNowButton />
            
        </Container>
    );

    function PlayNowButton(props) {
        return (
            <Box
                sx={{
                    width: '100%',
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: 'solid #333 1px'
                }}
            >
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} >
                        <Button
                            variant={'contained'}
                            color='primary'
                            children={'Play Now'}
                            sx={{
                                width: '100%',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    }

}



function OpponentSelector(props) {
    // let width = useScreenWidth()
    const { opponent, clickHandler } = props
    return (
        <Box 
            sx={{
                width: '100%',
                padding: 2, 
                display: 'flex',
                justifyContent: 'space-around',
                borderBottom: 'solid #333 1px'
            }}
        >
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} >
                    <Button
                        startIcon={<UserIcon />}
                        variant={'contained'}
                        onClick={() => clickHandler("human")}
                        color={opponent === "human" ? 'primary' : 'secondary'}
                        // children={width <= 600 ? 'vs. Human' : 'Play vs. Human'}
                        children={'Play vs. Human'}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Button
                        startIcon={<RobotIcon />}
                        variant={'contained'}
                        onClick={() => clickHandler("bot")}
                        color={opponent === "bot" ? 'primary' : 'secondary'}
                        // children={width <= 600 ? 'vs. Bot' : 'Play vs. Bot'}
                        children={'Play vs. Bot'}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>

            </Grid>
        </Box>
    )
}

function MathTopicSelector(props) {
    const { mathTopics, clickHandler } = props

    return (
        <Box
            sx={{
                width: '100%',
                padding: 2,
                display: 'flex',
                justifyContent: 'space-around',
                borderBottom: 'solid #333 1px'
            }}
        >
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} >
                    <Button
                        startIcon={<PlusIcon />}
                        variant={'contained'}
                        onClick={() => clickHandler("combining")}
                        color={mathTopics.includes("combining") ? 'primary' : 'secondary'}
                        children={'combining'}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Button
                        startIcon={<TimesIcon />}
                        variant={'contained'}
                        onClick={() => clickHandler("multiplying")}
                        color={mathTopics.includes("multiplying") ? 'primary' : 'secondary'}
                        children={'multiplying'}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6} >
                    <Button
                        startIcon={<DivideIcon />}
                        variant={'contained'}
                        onClick={() => clickHandler("fractions")}
                        color={mathTopics.includes("fractions") ? 'primary' : 'secondary'}
                        children={'fractions'}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6} >
                    <Button
                        startIcon={<SuperscriptIcon />}
                        variant={'contained'}
                        onClick={() => clickHandler("exponents")}
                        color={mathTopics.includes("exponents") ? 'primary' : 'secondary'}
                        children={'exponents'}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
            </Grid>
            
        </Box>


    );
}
