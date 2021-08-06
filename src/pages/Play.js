import React from 'react'
import {
    Link as RouterLink,
    useLocation,
} from "react-router-dom"

// MY components
import { GameBoard } from "../components/GameBoard";

// MUI  components
import { Typography, Container, Box } from '@material-ui/core'
import theme from '../theme';


export default function Play(props) {
    const location = useLocation()
    
    const { playMode, questionType} = location.state

    const [moveList, setMoveList] = React.useState([]);

    
    
    return (
        <Container maxWidth='sm' sx={{ bgcolor: 'background'}} disableGutters >
            <GameBoard 
                moveList={moveList}
            />
        </Container>

        

    );
}