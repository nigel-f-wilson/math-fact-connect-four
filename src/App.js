import React, { useState, useEffect } from 'react'
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom"


// Custom Hooks
// import { useScreenOrientation } from "./hooks/useScreenOrientaton"
// import { useScreenWidth } from "./hooks/useScreenWidth"
// import { useScreenHeight } from "./hooks/useScreenHeight"

import './App.css';

// PAGES
import Landing from "./pages/Landing"
import Play from "./pages/Play"


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
    
    

    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
            <Box sx={{
                bgcolor: 'background',
                height: '100vh',
                width: '100vw',
                overflow: 'scroll',
                // overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
            }}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Landing />
                        </Route>
                        <Route path="/play" >
                            <Play />
                        </Route>


                    </Switch>
                </Router>
            </Box>
        </ThemeProvider>
        </React.Fragment>
    );
}