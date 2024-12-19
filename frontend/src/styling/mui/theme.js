import { createTheme } from '@mui/material/styles'
import { typography as typ, colours } from './constants'

const theme = createTheme({
    typography: {
        h1: {
            fontSize: typ.size.XXL,
            fontWeight: typ.weight.bold,
            lineHeight: 1.6,
            letterSpacing: '-0.4px',
            fontFamily: typ.family.heading,
        },
        h2: {
            fontSize: typ.size.XL,
            fontWeight: typ.weight.semiBold,
            lineHeight: 1.2,
            letterSpacing: '-0.4px',
            fontFamily: typ.family.heading,
        },
        h3: {
            fontSize: typ.size.L,
            fontWeight: typ.weight.medium,
            lineHeight: 1.6,
            letterSpacing: '0px',
            fontFamily: typ.family.heading,
        },
        h4: {
            fontSize: typ.size.M,
            fontWeight: typ.weight.medium,
            lineHeight: 1.32,
            letterSpacing: '0.28px',
            fontFamily: typ.family.heading,
            margin: '15px 0 15px 0',
        },
        h5: {
            fontSize: typ.size.REG,
            fontWeight: typ.weight.medium,
            lineHeight: 1.6,
            letterSpacing: '0.2px',
            fontFamily: typ.family.heading,
        },
        h6: {
            fontSize: typ.size.S,
            fontWeight: typ.weight.bold,
            lineHeight: 1.6,
            letterSpacing: '0.2px',
            fontFamily: typ.family.heading,
        },
        body1: {
            fontSize: typ.size.REG,
            fontWeight: typ.weight.regular,
            lineHeight: 1.5,
            letterSpacing: '0.68px',
            fontFamily: typ.family.body,
            margin: '1% 0',
        },
        body2: {
            fontSize: typ.size.S,
            fontWeight: typ.weight.regular,
            lineHeight: 1.4,
            letterSpacing: '0.6px',
            fontFamily: typ.family.body,
        },
        caption: {
            fontSize: typ.size.S,
            fontWeight: typ.weight.regular,
            lineHeight: 1.66,
            letterSpacing: '0.4px',
            fontFamily: typ.family.body,
        },
        overline: {
            fontSize: typ.size.XS,
            fontWeight: typ.weight.regular,
            lineHeight: 2,
            letterSpacing: '1px',
            fontFamily: typ.family.body,
            textTransform: 'uppercase',
        },
        fontFamily: ['Urbanist', 'Inter', 'sans-serif'].join(','),
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: colours.primary.light,
            main: colours.primary.main,
            dark: colours.primary.dark,
            contrastText: colours.contrast.white,
        },
        secondary: {
            light: colours.secondary.light,
            main: colours.secondary.main,
            dark: colours.primary.dark,
            contrastText: colours.contrast.white,
        },
        action: {
            disabled: `${colours.contrast.disabled} !important`,
        },
    },
    overrides: {
        MuiContainer: {
            maxWidthLg: {
                maxWidth: '1550px !important',
            },
        },
        MuiDrawer: {
            background: colours.primary.main,
        },
        MuiFormControl: {
            root: {
                width: '100%',
                margin: '5px 0px',
            },
        },
        MuiFormHelperText: {
            contained: {
                'margin-left': '0',
                'margin-right': '0',
                'margin-top': '0',
                'margin-bottom': '2%',
            },
            root: {
                color: colours.contrast.grey,
            },
        },
        MuiFormLabel: {
            colorSecondary: {
                color: `${colours.contrast.offWhiteLight} !important`,
            },
        },
        MuiInputBase: {
            colorSecondary: {
                color: `${colours.contrast.offWhiteLight} !important`,
                borderColor: `${colours.contrast.offWhiteLight} !important`,
            },
            input: {
                '&:hover': {
                    borderColor: `${colours.contrast.offWhiteDark} !important`,
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                padding: '0px !important',
                notchedOutline: {
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.87)  !important',
                    },
                },
                fontFamily: typ.family.body,
                fontSize: typ.size.REG,
            },
            input: {
                '&:hover': {
                    borderColor: `${colours.contrast.offWhiteDark} !important`,
                },
            },
        },
        MuiInputLabel: {
            outlined: {
                transform: 'translate(10px, 12px) scale(1)',
            },
        },
        MuiTextField: {
            root: {
                '& .MuiInputBase-root': {
                    padding: '2px',
                },
            },
        },
        MuiChip: {
            root: {
                borderRadius: '8px',
                fontFamily: typ.family.body,
                fontWeight: typ.weight.medium,
                fontSize: typ.size.XS,
                backgroundColor: '#f4f4f4',
                height: '24px',
                '&:hover': {
                    backgroundColor: 'rgba(32, 59, 91, 0.12) !important',
                },
            },
            colorPrimary: {
                backgroundColor: 'rgba(32, 59, 91, 0.3)',
                color: 'black',
            },
            filledPrimary: {
                backgroundColor: '#f4f4f4',
            },
            outlinedPrimary: {
                borderRadius: '8px !important',
            },
        },
        MuiTableBody: {
            root: {
                width: '100%',
            },
        },
        MuiTableCell: {
            head: {
                fontFamily: typ.family.heading,
                fontWeight: typ.weight.semiBold,
                backgroundColor: '#f9f9f9',
            },
            body: {
                fontFamily: `${typ.family.body} !important`,
                fontWeight: typ.weight.regular,
                fontSize: typ.size.S,
            },
        },
        MuiIconButton: {
            root: {
                padding: '4px',
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                fontSize: typ.size.S,
                fontWeight: typ.weight.bold,
                letterSpacing: '0.6px',
            },
        },
        MuiRadio: {
            colorSecondary: {
                '&.Mui-checked': {
                    color: `${colours.primary.main} !important`,
                },
            },
        },
        MuiButton: {
            root: {
                fontWeight: typ.weight.bold,
                fontFamily: `${typ.family.body} !important`,
                letterSpacing: '0.6px',
                textTransform: 'capitalize',
            },
            textPrimary: {
                color: `${colours.primary.main}`,
            },
            textSecondary: {
                color: `${colours.contrast.grey}`,
            },
            outlinedSecondary: {
                background: colours.primary.main,
                borderRadius: '4px',
                border: `1px solid ${colours.primary.light}`,
                colorInherit: colours.contrast.white,
                color: `${colours.contrast.white} !important`,
                boxShadow:
                    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
                '&:hover': {
                    textDecoration: 'none',
                    backgroundColor: '#B56516',
                    boxShadow:
                        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)',
                    border: `1px solid #B56516`,
                },
                '&.Mui-disabled': {
                    color: '#a6a6a6 !important',
                    background: '#e0e0e0 !important',
                    borderColor: '#e0e0e0 !important',
                    boxShadow: 'none',
                },
            },
            outlinedPrimary: {
                background: colours.contrast.white,
                borderRadius: '4px',
                border: `1px solid ${colours.primary.main}`,
                colorInherit: colours.contrast.white,
                color: `${colours.primary.main} !important`,
                boxShadow: 'none',
                '&:hover': {
                    textDecoration: 'none',
                    backgroundColor: 'rgba(227, 127, 28, 0.04)',
                    border: `1px solid #B56516`,
                },
                '&.Mui-disabled': {
                    color: `#bdbdbd !important`,
                    background: `${colours.contrast.white} !important`,
                    borderColor: '#bdbdbd !important',
                },
            },
        },
        MuiSvgIcon: {
            colorPrimary: {
                color: `${colours.primary.main} !important`,
            },
            colorSecondary: {
                color: `${colours.contrast.grey} !important`,
            },
        },
    },
})

export default theme
