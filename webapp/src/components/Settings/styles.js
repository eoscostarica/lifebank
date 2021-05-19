export default (theme) => ({
  alert: {
    marginTop: theme.spacing(4)
  },
  textFieldWrapper: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: "24px",
    paddingRight: "16px",
    paddingLeft: "16px"
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 14,
    margin: '0',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "28px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15
  },
  text: {
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  textBox: {
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  labelOption: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    cursor: "pointer"
  },
  bodyWrapper: {
    height: '90%',
    padding: theme.spacing(0, 2)
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputStyle: {
    color: "rgba(0, 0, 0, 0.6)",
    width: '100%',
    marginTop: '6%'
  },
  marginTopBox: {
    marginTop: '16%'
  },
  button: {
    marginTop: '15%',
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "100%",
    height: '40px',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '15px',
    marginBottom: 10
  },
  dialog: {
    width: '360px',
    height: '600px',
    paddingTop: "20px",
    paddingBottom: "53px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "15px",
      paddingRight: "15px"
    }
  }
})