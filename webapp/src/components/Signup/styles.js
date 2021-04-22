export default (theme) => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  dialog: {
    paddingTop: "53px",
    paddingLeft: "53px",
    paddingRight: "53px",
    paddingBottom: "38px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "21px",
      paddingRight: "21px",
    }
  },
  register: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '5% 0'
  },
  goBack: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    left: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  registerBack: {
    color: `${theme.palette.primary.main} !important`
  },
  stepperContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  titleRegister: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.18,
    letterSpacing: '0.25px',
    color: '#rgba(0, 0, 0, 0.87)',
    marginBottom: 15
  },
  text: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#000000',
    marginBottom: 30
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  registerBtn: {
    width: 180,
    height: 49,
    color: "#ffffff",
    backgroundColor: 'transparent',
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: ' 2px',
    border: 'solid 2px #ffffff'
  },
  registerBoxModal: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerTextModal: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#000000',
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  registerBtnSideBar: {
    display: 'flex',
    alignItems: 'center',
  },
  boxInfo: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    }
  },
  divider: {
    width: '100%'
  },
  wrapperConsent: {
    height: "40vh",
    overflowY: 'scroll',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& img': {
      width: 80
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      margin: theme.spacing(1, 0, 2, 0)
    },
    '& div h1, & div h2': {
      textTransform: 'capitalize',
      margin: 0,
      fontSize: '2em'
    },
    '& p a': {
      wordBreak: 'break-all'
    },
    [theme.breakpoints.down('md')]: {
      height: "35vh",
    }
  },
  btnWrapperConsent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnAccept: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginTop: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  formDonor: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldDonor: {
    marginBottom: 10
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  btnSignup: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  formLifeBank: {
    width: '100%',
  },
  textField: {
    marginBottom: 10
  },
  boxCenter: {
    width: '100%',
    marginBottom: 15
  },
  btnContinue: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: '70%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginTop: 10,
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '70%',
    }
  },
  grecaptcha: {
    [theme.breakpoints.down('md')]: {
      transform: 'scale(0.7)'
    }
  },
  mapBox: {
    marginTop: theme.spacing(2)
  },
  wrapperRoleSelector: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btn: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "60%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '15px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  success: {
    color: theme.palette.success.main
  }
})