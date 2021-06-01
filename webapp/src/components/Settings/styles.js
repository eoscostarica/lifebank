export default (theme) => ({
  alert: {
    marginTop: theme.spacing(4)
  },
  textFieldWrapper: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    padding: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.24)',
  },
  divider: {
    marginTop: "25px",
  },
  dividerSecondVersion: {
    marginBottom: "25px",
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 3,
    left: 14,
    padding: theme.spacing(2, 0),
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
  },
  text: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: '20px'
  },
  box: {
    marginBottom: '25px',
    width: '100%'
  },
  boxSecondVersion:{
    width: '100%',
    marginBottom: '20px'
  }
  ,
  checkBox: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center',
    width: '100%'
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
    height: '100%',
    padding: theme.spacing(0, 2)
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px'
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
    paddingLeft: '30px',
    paddingRight: '30px',
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
  },
  dimensions: {
    paddingTop: '32px',
    width: 500,
    height: 640,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      height: "100%"
    }
  }
})