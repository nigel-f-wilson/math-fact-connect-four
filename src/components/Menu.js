import * as React from 'react';
import { Popover, Typography, Button } from '@material-ui/core'
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip } from '@material-ui/core'





// Icons
import ReplayIcon from "@material-ui/icons/Replay";
import MenuIcon from '@material-ui/icons/Menu';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Settings from '@material-ui/icons/Settings';
import Logout from '@material-ui/icons/Logout';




export function InGameMenu(props) {
    let { handleNewGameClick, handleUndoClick } = props
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl)   // Is open if anchor element set.
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <Button variant="text"
                aria-describedby={id} 
                onClick={openMenu}
                sx={{
                    color: 'common.black',
                    bgcolor: 'background',
                    position: 'absolute',
                    top: '1%',
                    right: '1%',
                    zIndex: 9999,
                    padding: 0,
                    minWidth: '10px',
                }}
            >
                <MenuIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{ 
                    vertical: 'top', 
                    horizontal: 'right', 
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </React.Fragment>
    );
}


function NewGameButton(props) {
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

function UndoButton(props) {
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