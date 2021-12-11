import {
    createTheme,
    responsiveFontSizes,
} from '@material-ui/core/styles';

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
    },
    typography: {
        h1: {
            fontSize: '5.5rem',
        },
        h2: {
            fontSize: '4.0rem',
        },
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

export default responsiveFontSizes(theme, {factor: 2})
// https://mui.com/customization/theming/#responsivefontsizes-theme-options-theme