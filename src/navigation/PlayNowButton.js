import React from 'react'
import {
    Link as RouterLink,
} from "react-router-dom"

import { Typography, Container } from '@material-ui/core'
import { Button } from '@material-ui/core'

export default function PlayNowButton() {
    return (
        <Button
            variant='contained'
            color="primary"
            component={RouterLink}
            to='/game-settings'
        >
            Play Now!
        </Button>
    )
}