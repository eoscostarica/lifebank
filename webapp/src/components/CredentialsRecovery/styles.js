export default (theme) => ({
  alert: {
    marginTop: theme.spacing(4)
  },
  textFieldWrapper: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    justifyContent: 'space-evenly'
  },
  recoveryButton: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#000000'
  },
  recoveryBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
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
  marginTop: {
    marginTop: '6%'
  },
  marginTopBox: {
    marginTop: '16%'
  },
  button: {
    marginTop: '6%',
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
    paddingTop: "53px",
    paddingLeft: "53px",
    paddingRight: "53px",
    paddingBottom: "60px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "21px",
      paddingRight: "21px"
    }
  }
})