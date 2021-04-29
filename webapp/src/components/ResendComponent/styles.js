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
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  dialog: {
    paddingTop: "25px",
    [theme.breakpoints.down('sm')]: {
      paddingTop: '25%'
    }
  },
  box: {
    alignItems: 'center',
    margin: '15%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  mainButton: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "50%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 20,
    marginLeft: '23%',
    [theme.breakpoints.down('md')]: {
      width: "50%"
    }
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 45
  },
  subTitle: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 46
  }

})