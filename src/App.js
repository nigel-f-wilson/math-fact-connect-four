import React from 'react'
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import './App.css';

// PAGES
import Landing from "./pages/Landing"
import Rules from "./pages/Rules"
import PlayVsHuman from "./pages/PlayVsHuman"
import PlayVsBot from "./pages/PlayVsBot"


// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'


// THEMING
import theme from "./theme"
import {
    // makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles'



export default function App() {
    // const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
            <Box sx={{
                bgcolor: 'background',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flexStart',
            }}>
                <Container maxWidth='sm' disableGutters >
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Landing />
                            </Route>

                            <Route path="/how-to-play">
                                <Rules />
                            </Route>



                            <Route path="/play-vs-human">
                                <PlayVsHuman />
                            </Route>

                            <Route path="/play-vs-bot">
                                <PlayVsBot />
                            </Route>


                        </Switch>
                    </Router>
                </Container>
            </Box>
        </ThemeProvider>
        </React.Fragment>
    );
}