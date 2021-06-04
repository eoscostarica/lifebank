export default (theme) => ({
  wrapper: {
    width: '100%',
  },

  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  box: {
    display: 'inline-block'
  },
  iconOption: {
    color: '#ba0d0d',
    fontSize: 20
  }
})