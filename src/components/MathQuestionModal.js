import React from 'react'

// Custom Hooks
// import { useHover } from "../hooks/useHover"
// import { useScreenOrientation } from "../hooks/useScreenOrientaton"
// import { useScreenWidth } from "../hooks/useScreenWidth"
// import { useScreenHeight } from "../hooks/useScreenHeight"

// MY  components
// import NewGameButton from '../components/buttons/NewGameButton'

// MUI  components
import { Box } from '@material-ui/core'
import { height, width } from '@material-ui/system'

// Style & Layout Constants

export function MathQuestionModal(props) {
    // const orientation = useScreenOrientation()
    // const height = useScreenHeight()
    // const width = useScreenWidth()
    let { moveList, gameStatus, handleNewGameClick, playMode, questionType } = props
    
    
    
    return (
        <Box id='info-panel' sx={{  }} >
            
        </Box>
    );
}

