import * as React from 'react';
import { Popover, Typography, Button } from '@material-ui/core'
// Icons
import ReplayIcon from "@material-ui/icons/Replay";
import MenuIcon from '@material-ui/icons/Menu';

export function Menu(props) {
    let { handleNewGameClick } = props
    
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
        <div>
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
        </div>
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