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
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  backIcon: {
    color: '#121212'
  },
  buttonIconDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  },
  offerContent: {
    padding: 30
  },
  componentHeader: {
    padding: 20,
    margin: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  componentAvatar: {
    height: '40px',
    width: '40px'
  },
  componentTitleContainer: {
    width: '100%'
  },
  componentTitle: {
    marginLeft: 17,
    marginTop: 3,
    width: '100%',
    fontFamily: 'Roboto',
    fontsize: '20px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  componentSubTitle: {
    marginLeft: 17,
    marginTop: 1,
    width: '100%',
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  componentContent: {
    overflow: 'auto',
    padding: 10
  },
  componentontentText: {
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  componentontentTextAux: {
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: '#121212'
  },
  componentActionsButton: {
    width: '100%'
  },
  cardActionButton: {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    paddingTop: 10,
    bottom: 10,
    right: 15,
    borderRadius: '48px',
    backgroundColor: '#ba0d0d',
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.5',
    textAlign: 'center',
    color: '#ffffff'
  },
  iconBottomAppBar: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  stepper: {
    backgroundColor: '#ffffff'
  },
  img: {
    height: '30vh',
    objectFit: 'cover',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    right: 20,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: '#121212'
    }
  },
  fabButtonOffer: {
    borderRadius: "48px",
    backgroundColor: "#ba0d0d",
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.5",
    textAlign: "center",
    color: "#ffffff",
    margin: 20
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20
  }
})