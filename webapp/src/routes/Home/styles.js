import mobileBgImage from '../../assets/the-world.png'
import bgImage from '../../assets/lifebank-hero-bg.png'
export default (theme) => ({
  homeHeader: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex',
    backgroundImage: `url(${mobileBgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.up('md')]: {
      height: 578,
      backgroundImage: `url(${bgImage})`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  boxLeft: {
    width: '60%',
    paddingTop: theme.spacing(2),
    '& h1': {
      color: theme.palette.white,
      letterSpacing: '1px',
      marginLeft: theme.spacing(1)
    },
    '& h5': {
      color: theme.palette.secondary.main,
      letterSpacing: '0.25px',
      fontSize: 18,
      fontWeight: 500
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      paddingTop: theme.spacing(8),
      '& h1': {
        fontSize: 72,
        lineHeight: 0.68,
        textShadow: `0 2px 10px ${theme.palette.primary.mediumEmphasizedBlackText}`
      }
    }
  },
  boxRight: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(5, 1, 0, 0),
    '& p': {
      color: theme.palette.white,
      textAlign: 'end',
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      alignItems: 'center',
      padding: theme.spacing(8, 1, 0, 0),
      '& p': {
        lineHeight: 1.22,
        letterSpacing: '1px',
        fontSize: 32,
        textShadow: `0 2px 10px ${theme.palette.primary.mediumEmphasizedBlackText}`
      }
    }
  },
  registerBtn: {
    width: 180,
    height: 49,
    backgroundColor: 'transparent',
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: ' 2px',
    border: 'solid 2px #ffffff'
  },
  fabButtonDesktop: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'fixed',
    zIndex: 1,
    bottom: 20,
    right: 20,
    margin: '0',
    color: '#ffffff'
  },
  iconFab: {
    color: '#ffffff',
    marginRight: 10
  },
  buttonIconDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  title: {
    height: '50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  boxControls: {
    padding: 20,
    display: 'flex'
  },
  mainGridControlsDesktop: {
    backgroundColor: '#ffffff'
  },
  mainGridDesktop: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRigth: 20,
    backgroundColor: '#ffffff'
  },
  boxIcons: {
    marginRight: '15px'
  },
  searchBar: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.75',
    letterSpacing: '0.44px',
    '& .MuiInputBase-input ': {
      paddingTop: '12px'
    }
  },
  iconSeachBar: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 20,
    marginLeft: 15,
    marginRight: 15
  },
  recordingIcon: {
    color: '#ba0d0d'
  },
  titleMainSection: {
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal'
  },
  appBarTab: {
    backgroundColor: '#ffffff',
    boxShadow: 'none'
  },
  tabs: {
    color: '#121212',
    backgroundColor: 'ffffff'
  },
  tabPanel: {
    backgroundColor: '#ffffff'
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#ffffff'
  },
  fabButton: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'absolute',
    zIndex: 1,
    top: -30,
    right: 20,
    margin: '0',
    color: '#ffffff'
  },
  iconBottomAppBar: {
    color: '#121212'
  }
})