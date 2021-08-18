import React from 'react'
// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants

export function InfoPanel(props) {
    let { moveList, orientation } = props
    
    return (
        <Box id='info-panel' sx={{  }} >
            The Info Panel <br/>
            <p>{orientation}</p>
        </Box>
    );
}

