export default (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '994px',
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    paddingTop: '60px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '5%',
      paddingRight: '5%'
    },
  },
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
    display: 'flex',
    height: 'calc(100vh - 60px)',
    width: "90%",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  tableContent: {
    paddingTop: "30px",
    width: "100%"
  },
})
