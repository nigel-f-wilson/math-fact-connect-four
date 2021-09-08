import React from 'react'

// MUI Components
import { Button } from "@material-ui/core";

// Icons
import ReplayIcon from "@material-ui/icons/Replay";

export default function NewGameButton(props) {
    let { handleClick } = props
    return (
        <Button 
            variant="outlined"
            startIcon={<ReplayIcon />} 
            onClick={() => handleClick()}
        >
            New&nbsp;Game
        </Button>
    )
}