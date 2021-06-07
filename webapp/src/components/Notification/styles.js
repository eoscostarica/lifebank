export default (theme) => ({
  wrapper: {
    color: 'inherit'
  },
  notificationIcon: {
    color: '#121212',
    width: 24,
    height: 24
  },
  notificationIconTransparent: {
    color: '#ffffff'
  },
  appBar: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'

  },
  backIcon: {
    color: '#121212'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  },
  box: {
    justifyContent: 'center',
    marginLeft: '60%',
    [theme.breakpoints.down('md')]: {
      marginLeft: '30%',
    },
  },
  showMoreBox: {
    display: 'flex',
    justifyContent: 'center'
  },
  showMore: {
    borderRadius: '50px',
    backgroundColor: '#504c4c',
    width: "30%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    marginBottom: 20,
    position: 'relative',
    bottom: 0
  }
})