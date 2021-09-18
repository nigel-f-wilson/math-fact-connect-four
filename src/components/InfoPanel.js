import React from 'react'

// Custom Hooks
import { useHover } from "../hooks/useHover"
import { useScreenOrientation } from "../hooks/useScreenOrientaton"
import { useScreenWidth } from "../hooks/useScreenWidth"
import { useScreenHeight } from "../hooks/useScreenHeight"

// MY  components
import NewGameButton from '../components/buttons/NewGameButton'

// MUI  components
import { Box } from '@material-ui/core'
import { height, width } from '@material-ui/system'

// Style & Layout Constants

export function InfoPanel(props) {
    const orientation = useScreenOrientation()
    const height = useScreenHeight()
    const width = useScreenWidth()
    let { moveList, gameStatus, handleNewGameClick, playMode, questionType } = props
    const [hoverRef, isHovered] = useHover();
    
    return (
        <Box id='info-panel' sx={{  }} >
            The Info Panel:  <br/>
            
            <p>Game Status: {gameStatus}</p>
            <p>Orientation: {orientation}</p>
            <p>Height: {height}</p>
            <p>Width: {width}</p>
            <p>Play Mode: {playMode}</p>
            <p>Question Type: {questionType}</p>
            <NewGameButton 
                handleClick={handleNewGameClick}
            />
        </Box>
    );
}

