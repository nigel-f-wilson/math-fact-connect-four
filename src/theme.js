import {
    createTheme,
    responsiveFontSizes,
} from '@material-ui/core/styles';


const theme = createTheme({
    palette: {
        primary: {
            light: '#669944',
            main: '#2e6b12',
            dark: '#004000',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FFFFF',
            main: '#669944',
            dark: '#777777',
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
            playerOne: '#d50000',
            playerTwo: '#ffea00',
            unclaimed: '#ffffff',
        },
        background: '#b3e5fc',
        white: '#FFFFFF',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    backgroundColor: '#fff',
                },
            },
        },
    },
    typography: {
        
    },
    status: {
       
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,

});

export default responsiveFontSizes(theme)