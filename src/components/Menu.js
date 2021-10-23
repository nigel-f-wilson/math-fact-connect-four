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
// import Logout from '@material-ui/icons/Logout';





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
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    onClick={closeMenu}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <NewGameButton 
                            handleClick={handleNewGameClick}
                        />
                    </MenuItem>
                    <MenuItem>
                        <UndoButton 
                            handleClick={handleUndoClick}
                        />
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon sx={{ color: '#000', pr: 2 }} >
                            <Settings fontSize="medium" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon sx={{ color: '#000', fontSize: '1.2rem', pr: 2 }} >
                            <i className="fas fa-robot"></i>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
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