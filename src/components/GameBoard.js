import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"



// MUI  components
import { Box } from '@material-ui/core'

// Style & Layout Constants
const squarePercentage = '14.287%'
const chipSizeRelativeToSquare = '84%'

    // const moveList = props.moveList // An Array of integers ranging -1 thru 41 of indeterminate length
    const moveList = [-1, 1,2,3,4,5,-1,-1,6,-1,8,9,-1,10,-1,11,-1,12] // Testing Only


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