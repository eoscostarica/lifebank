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
  }
})
