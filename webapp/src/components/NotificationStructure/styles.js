export default (theme) => ({
  wrapper: {
    width: '100%',
    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.24)',
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'left'
  },
  box: {
    display: 'inline-block'
  },
  iconOption: {
    color: '#ba0d0d',
    fontSize: 20
  },
})