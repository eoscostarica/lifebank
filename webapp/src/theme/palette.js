import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  black,
  white,
  primary: {
    main: '#212121',
    light: '#757575',
    contrastText: 'rgba(255, 255, 255, 1)',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9E9E9E',
    400: '#BDBDBD',
    300: '#E0E0E0',
    200: '#EEEEEE',
    100: '#F5F5F5',
    50: '#FAFAFA',
    onPrimaryHighEmphasizedText: 'rgba(255, 255, 255, 1)',
    onPrimaryMediumEmphasizedText: 'rgba(255, 255, 255, 0.6)',
    onPrimaryDisabledText: 'rgba(255, 255, 255, 0.38)',
    highEmphasizedBlackText: 'rgba(0, 0, 0, 0.87)',
    mediumEmphasizedBlackText: 'rgba(0, 0, 0, 0.6)',
    disabledBlackText: 'rgba(0, 0, 0, 0.38)'
  },
  secondary: {
    main: '#B71C1C',
    light: '#E57373',
    dark: '#E53935',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    900: '#B71C1C',
    800: '#C62828',
    700: '#D32F2F',
    600: '#E53935',
    500: '#F44336',
    400: '#EF5350',
    300: '#E57373',
    200: '#EF9A9A',
    100: '#FFCDD2',
    50: '#FFEBEE',
    onSecondaryHighEmphasizedText: 'rgba(0, 0, 0, 0.87)',
    onSecondaryMediumEmphasizedText: 'rgba(0, 0, 0, 0.6)',
    onSecondaryDisabledText: 'rgba(0, 0, 0, 0.38)',
    highEmphasizedWhiteText: 'rgba(255, 255, 255, 1)',
    mediumEmphasizedWhiteText: 'rgba(255, 255, 255, 0.6)',
    disabledWhiteText: 'rgba(255, 255, 255, 0.38)'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: black,
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: white,
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
}
