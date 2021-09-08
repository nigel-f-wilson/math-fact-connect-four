import React from 'react'

import { useHover } from "../hooks/useHover";

// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants

export function InfoPanel(props) {
    let { moveList, orientation, gameStatus } = props
    const [hoverRef, isHovered] = useHover();
    
    return (
        <Box id='info-panel' sx={{  }} >
            The Info Panel: {gameStatus} <br/>
            <p>{orientation}</p>
            
            <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;

        </Box>
    );
}

