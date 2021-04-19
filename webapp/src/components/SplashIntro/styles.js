export default (theme) => ({
  imageIcon: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%',
      height: '70vh'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      height: '40vh'
    },
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  iconRoot: {
    textAlign: 'center',
    width: '100%',
    height: '100%'
  },
  carouselContainer: {
    height: '99vh',
    width: '100%',
    position: 'relative'
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    [theme.breakpoints.between('xs', 'sm')]: {
      maxHeight: 440
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 640
    }
  },
  capitalize: {
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  caption: {
    textTransform: 'uppercase',
    color: '#121212',
    opacity: 0.3
  },
  slideHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.between('xs', 'sm')]: {
      zIndex: 9999,
      position: 'absolute',
      right: 0,
      top: 10
    },
    [theme.breakpoints.up('sm')]: {
      zIndex: 0,
      position: 'relative'
    }
  },
  nextBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: theme.spacing(2)
  },
  nextBtn: {
    borderRadius: '48px',
    height: '32px',
    width: '106px',
    verticalAlign: 'middle',
    color: 'white'
  },
  stepper: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: 50
    }
  },
  mainHeading: {
    fontSize: '18px',
    letterSpacing: '0.64px',
    fontWeight: 'bold',
    lineHeight: '1.33',
    textAlign: 'center',
    fontStretch: 'normal'
  },
  medium: {
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: 0.5,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal'
  }
})