export default (theme) => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 1,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  title: {
    height: '50px'
  },
  map: {
    height: '50vh',
    width: '50vw',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 50px)',
      width: '100vw'
    }
  },
  marker: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '& svg': {
      width: 30
    },
    '& p': {
      fontSize: 12,
      color: theme.palette.primary.mediumEmphasizedBlackText,
      lineHeight: 1.33,
      letterSpacing: '0.4px'
    }
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  buttonMapDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  }
})