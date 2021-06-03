export default (theme) => ({

  boxSelect: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  formControl: {
    margin: theme.spacing(2),
    marginLeft: 25,
    minWidth: 180
  },
  root: {
    padding: theme.spacing(4),
    height: 'calc(100vh - 60px)',
    width: "90%",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  tableContent: {
    width: '110%',
    marginLeft: "100",
    [theme.breakpoints.down('md')]: {
      width: "100%",
      marginLeft: "0"
    }
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: "100%"
  },
  title: {
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    marginLeft: "20px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
})
