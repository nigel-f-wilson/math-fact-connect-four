import React from 'react'

// Custom Hooks
import { useHover } from "../hooks/useHover";
import { useScreenOrientation } from "../hooks/useScreenOrientaton"

// MY  components
import NewGameButton from '../components/buttons/NewGameButton'

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants

export function InfoPanel(props) {
    let { moveList, orientation, gameStatus, handleNewGameClick, playMode, questionType } = props
    const orientation = useScreenOrientation()
    const [hoverRef, isHovered] = useHover();
    
    return (
        <Box id='info-panel' sx={{  }} >
            The Info Panel:  <br/>
            
            <p>Game Status: {gameStatus}</p>
            <p>Orientation: {orientation}</p>
            <p>Play Mode: {playMode}</p>
            <p>Question Type: {questionType}</p>
            <NewGameButton 
                handleClick={handleNewGameClick}
            />
        </Box>
    );
}

