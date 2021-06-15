export default (theme) => ({
  wrapper: {
    width: '100%',
    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.24)',
  },
  wrapperNew: {
    width: '100%',
    backgroundColor: 'red'
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'left'
  },
  title: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  iconOption: {
    color: '#ba0d0d',
    fontSize: 20
  },
})