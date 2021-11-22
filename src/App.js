import React from 'react'

// PAGES
import WelcomePage from "./pages/Welcome"
// import SettingsPage from "./pages/Settings"
import PlayPage from "./pages/Play"
import InfoPage from "./pages/Info"

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'


// THEME
import theme from "./theme"
import { ThemeProvider, } from '@material-ui/core/styles'

export default function App() {
    // GAME STATE
    // DISPLAY --> Enum ['gameBoard', 'settingsModal', 'questionModal', 'infoModal']
    // MOVELIST --> An Array of integers ranging -1 thru 41 of indeterminate length
    // GAMESTATUS --> Enum ['playerOnesTurn', 'playerTwosTurn', 'playerOneWins', 'playerTwoWins', 'gameOverDraw']
    const [display, setDisplay] = React.useState('settingsModal')
    const [moveList, setMoveList] = React.useState([])
    const [gameStatus, setGameStatus] = React.useState('playerOnesTurn')
    
    
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
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* <WelcomePage /> */}
                    <PlayPage />
                    {/* <InfoPage /> */}
                    
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}