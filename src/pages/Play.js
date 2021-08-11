import React from 'react'
import {
    Link as RouterLink,
    useLocation,
} from "react-router-dom"

// MY UI components
import { GameBoard } from "../components/GameBoard";

// MY UI components
import { lineIdToSquareIdsMap, squareIdToLineIdsMap } from '../logic/maps'   

// MUI  components
import { Typography, Container, Box } from '@material-ui/core'
import theme from '../theme';


export default function Play(props) {
    const 
    
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