import React from 'react'

// Custom Hooks
import { useHover } from "../hooks/useHover";

// MY  components
import NewGameButton from '../components/buttons/NewGameButton'

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants

export function InfoPanel(props) {
    let { moveList, orientation, gameStatus, handleNewGameClick } = props
    const [hoverRef, isHovered] = useHover();
    
    return (
        <Box id='info-panel' sx={{  }} >
            The Info Panel: {gameStatus} <br/>
            <p>{orientation}</p>

            <NewGameButton 
                handleClick={handleNewGameClick}
            />
            
            <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;

        </Box>
    );
}

