import {
    createTheme,
    responsiveFontSizes,
} from '@material-ui/core/styles';

import { useScreenWidth, useScreenHeight } from "./hooks"
import { height, width } from '@material-ui/system'

// const height = useScreenHeight()
// const width = useScreenWidth()
// const boardSideLength = (height <= width) ? height * 0.95 : width * 0.95


const theme = createTheme({
    palette: {
        primary: {
            light: '#669944',
            main: '#2e6b12',
            dark: '#004000',  // Color applied on Button Hover
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FFFFF',
            // main: 'rgba(46, 107, 18, 0.8)',  // washed out shade of primary.main
            main: '#78ba59',
            dark: '#004000',  // Color applied on Button Hover
            contrastText: '#FFFFFF'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        action: {
            disabledBackground: '#2e6b12',
            disabledOpacity: '0.5'
        },
        board: {
            light: '#2962ff',
            main: '#0039cb',
            dark: '#001399',
        },
        chip: {
            playerOne: '#d50000',  // red
            playerTwo: '#ffea00',  // yellow
            unclaimed: '#b3e5fc',  // light blue
        },
        background: '#b3e5fc',
        white: '#FFFFFF',
        transparent: 'rgba(0, 0, 0, 0)',
        selectedButton: 'rgba(46, 107, 18, 1.0)',     // Same as primary.main
        unselectedButton: 'rgba(46, 107, 18, 0.65)',
    },
    components: {
        MuiPaper: {
            styleOverrides: {  // Name of the slot
                root: {        // Some CSS
                    backgroundColor: '#fff',
                },
            },
        },
        // MuiPaper: {
        //     styleOverrides: {  // Name of the slot
        //         root: {        // Some CSS
        //             backgroundColor: '#fff',
        //             borderRadius: '50%',
        //             // borderRadius: '5%',
        //             height: 'min(85vh, 85vw)',
        //             width: 'min(85vh, 85vw)',
        //             transform: 'translate(0, 27vh)',
        //             // display: 'flex',
        //             // justifyContent: 'center',

        //         },
        //     },
        // },
    },
    typography: {
        button: {
            fontSize: '1.0rem',
            fontWeight: '700'
        }
    },
    status: {
       
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    transitions: {
        easing: {
            bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            parabolicAcceleration: "cubic-bezier(0.5, 0.0, 1.0, 0.5)"
        }
    },
    zIndex: {
        chip: 10,
        board: 20
    }

});

export default responsiveFontSizes(theme)