export default (theme) => ({
  textField: {
    marginTop: theme.spacing(2)
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarRoundDesktop: {
    width: '90px',
    height: '90px',
    border: 'solid 2px rgba(0, 0, 0, 0.04)',
    [theme.breakpoints.down('md')]: {
      width: '70px',
      height: '70px',
    },
    marginTop: '10px',
    marginBottom: '10px'
  },
  logoTitle: {
    textAlign: 'center'
  }
})