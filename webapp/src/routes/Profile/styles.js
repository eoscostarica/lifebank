export default (theme) => ({
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    width: '100%',
    paddingTop: '60px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '23%',
      paddingRight: '23%',
    },
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      textTransform: 'capitalize'
    }
  },
  divider: {
    width: '100%'
  },
  editBtn: {
    marginTop: theme.spacing(4)
  },
  transactionLink: {
    wordBreak: 'break-all'
  },
  subtitleProfile: {
    padding: theme.spacing(0, 2),
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'left'
  },
  heart: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 0,
    width: '100px',
    fontSize: 275,
    animation: '$heartbeat 1.4s linear infinite',
    [theme.breakpoints.up('md')]: {
      width: '100px'
    }
  },
  tokensBox: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  editButton: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'fixed',
    zIndex: 1,
    bottom: 20,
    right: 20,
    margin: '0',
    color: '#ffffff',
    backgroundColor: '#ba0d0d'
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2) * -1
  },
  boxQr: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  },
  routerLinkUpdate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  updateButton: {
    maxWidth: '50%',
  },
  secondaryText: {
    color: `${theme.palette.secondary.main} !important`
  },
  noCapitalize: {
    textTransform: 'none !important'
  },
  customizedLinearProgress: {
    height: 10,
    borderRadius: 5
  },
  alertBox: {
    width: "100%",
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(2)
  },
  alert: {
    width: "100%",

    '& > div.MuiAlert-message': {
      padding: 0,
      margin: 0
    },
    '& > div.MuiAlert-action': {
      maxHeight: 50
    },
  },
  buttonContainer: {
    width: "100%",
    margin: theme.spacing(2, 0)
  },
  contentHeader: {
    position: 'relative',
    height: 'auto',
    width: '100%',
    padding: theme.spacing(0, 2),
    marginBottom: '40px'
  },
  titleProfile: {
    width: '65%',
    fontFamily: 'Roboto',
    fontSize: '34px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: '10px',
    marginBottom: '4px',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    }
  },
  avatarRoundDesktop: {
    position: 'absolute',
    width: '90px',
    height: '90px',
    right: 10,
    top: 0,
    border: 'solid 2px rgba(0, 0, 0, 0.04)',
    [theme.breakpoints.down('md')]: {
      width: '70px',
      height: '70px',
    }
  },
  rowTitle: {
    fontWeight: 'bold',
    marginRight: '10px'
  },
  rowBoxLeft: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2, 2),
    alignItems: 'flex-start',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      textTransform: 'capitalize'
    }
  },
  element: {
    height: '100%',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  dialogContent: {
    padding: theme.spacing(5, 2),
    marginTop: theme.spacing(10)
  },
  img: {
    marginTop: theme.spacing(1),
    height: '30vh',
    objectFit: 'cover',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  },
  stepper: {
    backgroundColor: '#ffffff'
  },
  socialIcon: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  routerLink: {
    width: "100%",
    textDecoration: "none",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  offerContainer: {
    width: "100%",
    margin: 20,
    backgroundColor: '#000000'
  },
  mainGridDesktop: {
    paddingTop: 39,
    backgroundColor: '#ffffff'
  }
})