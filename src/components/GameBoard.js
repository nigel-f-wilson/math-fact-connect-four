import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"



// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'



export default function GameBoard() {

            width: squarePercentage,
            height: '100%',
    return (
        <Box sx={{ bgcolor: 'board.main', mt: 4, pt: '100%', width: '100%' }} >
            height: squarePercentage,
            width: '100%',
            height: chipSizeRelativeToSquare,
            width: chipSizeRelativeToSquare,

        
        </Box>
    );
}