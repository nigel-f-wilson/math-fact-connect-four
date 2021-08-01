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
        playerOne: {
            backgroundColor: '#C11',
            text: '#000'
        },
        playerTwo: {
            backgroundColor: '#11C',
            text: '#FFF'
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

export default theme
// export default responsiveFontSizes(theme)