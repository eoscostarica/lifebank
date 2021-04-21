export default (theme) => ({
  tabsWrapper: {
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down('sm')]: {
      '& button': {
        width: '33.3vw'
      }
    }
  },
  wrapper: {
    minHeight:'100vh',
    height: '95vh',
    padding: theme.spacing(2, 1, 0, 1),
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
    '& h1, & h2': {
      textTransform: 'capitalize',
      margin: 0
    },
    '& p a': {
      wordBreak: 'break-all'
    }
  }
})