import React from 'react'
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

// PAGES
import WelcomePage from "./pages/Welcome"
import SettingsPage from "./pages/Settings"
import PlayPage from "./pages/Play"
import InfoPage from "./pages/Info"

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'


// THEME
import theme from "./theme"
import { ThemeProvider, } from '@material-ui/core/styles'

export default function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Box id='root'
                    sx={{
                        // border: 'solid red 5px',
                        bgcolor: 'background',
                        height: '100vh',
                        width: '100vw',
                        // overflow: 'scroll',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<WelcomePage />} />
                            <Route exact path="/settings" element={<SettingsPage />} />
                            <Route exact path="/play" element={<PlayPage />} />
                            <Route exact path="/info" element={<InfoPage />} />
                        </Routes>
                    </Router>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}