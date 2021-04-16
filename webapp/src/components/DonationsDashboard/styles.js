export default (theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  fabButton: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'absolute',
    zIndex: 1,
    top: -30,
    right: 10,
    margin: '0',
    color: '#ffffff',
    [theme.breakpoints.down(370)]: {
      height: 60,
      width: 60,
    }
  },
  fabButtonOffer: {
    position: "absolute",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    paddingTop: 10,
    bottom: 15,
    right: 20,
    borderRadius: "48px",
    backgroundColor: "#ba0d0d",
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.5",
    textAlign: "center",
    color: "#ffffff",
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
  iconBottomAppBar: {
    color: '#121212'
  },
  iconFab: {
    color: '#ffffff',
    [theme.breakpoints.up(370)]: {
      marginRight: 10
    }
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  dashboardContent: {
    [theme.breakpoints.down('md')]: {
      maxHeight: "80vh"
    },
  },
  draweTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.5,
    letterSpacing: '0.15px',
    marginBottom: 7
  },
  draweTitleDesktop: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    marginBottom: 7
  },
  dividerTitle: {
    marginBottom: 4
  },
  boxBalance: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  balanceText: {
    color: '#121212',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    margin: 0
  },
  heart: {
    padding: 0,
    width: '110px',
    fontSize: 275,
    animation: '$heartbeat 1.4s linear infinite',
    [theme.breakpoints.up('md')]: {
      width: '140px'
    }
  },
  sectionTitle: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '10px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.6,
    letterSpacing: '0.5px',
    marginBottom: 0
  },
  dividerSection: {
    marginBottom: 4,
    color: '#000000'
  },
  sectionText: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: '0.25px',
    marginBottom: 10
  },
  titleScanQR: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
  },
  backIcon: {
    color: '#121212'
  },
  boxQR: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: 20
    }
  },
  accountText: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.5,
    letterSpacing: '0.15',
    margin: 11
  },
  inputText: {
    width: '85%'
  },
  camaraButtonIcon: {
    width: '10%',
    marginTop: 5,
    marginLeft: 10
  },
  camaraIcon: {
    color: '#000000'
  },
  sendTokenButton: {
    backgroundColor: '#ba0d0d',
    borderRadius: 50,
    height: 40,
    width: 140,
    padding: 10,
    color: '#ffffff',
    marginBottom: "20px"
  },
  boxButtonSendToken: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  boxTexfield: {
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '70%',
      margin: 'auto',
      marginTop: 20
    }
  },
  dialog: {
    padding: 20
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  switchCamaraButton: {
    backgroundColor: "#ba0d0d",
  },
  switchCamaraIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 5,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "#121212"
    }
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
})