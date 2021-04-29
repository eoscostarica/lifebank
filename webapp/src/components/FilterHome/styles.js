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
    height: '50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15
  },
  buttonMapDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  buttonIconDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  }
})