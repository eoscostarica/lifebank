export default (theme) => ({
  carruselImage: {
    height: '100%',
    width: '100%'
  },
  divider: {
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold'
  },
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  markLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontSize: 18
    }
  },
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(1)
    }
  },
  contentBodyDesktop: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: '50px',
    paddingLeft: '20%',
    paddingRight: '20%',
    height: 'auto'
  },
  imageSectionDesktop: {
    width: '100%',
    height: '380px'
  },
  carouselDesktop: {
    height: '380px',
    borderRadius: '10px'
  },
  desktopContainerImageDefault: {
    width: '100%',
    height: '380px',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desktopImageDefault: {
    width: '50%',
    height: '50%',
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '10px'
  },
  headerContentDesktop: {
    position: 'relative',
    width: '100%',
    paddingTop: '30px',
    paddingBottom: '25px'
  },
  avatarRoundDesktop: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    top: 25,
    left: 10
  },
  titleDesktop: {
    width: '98%',
    height: '40px',
    fontFamily: 'Roboto',
    fontSize: '34px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: '10px',
    marginTop: '10px',
    marginBottom: '4px',
    textAlign: 'center'
  },
  subtitleDesktop: {
    position: 'absolute',
    top: 20,
    right: 10,
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '10px',
    paddingTop: '26px'
  },
  bodyContentDesktop: {
    display: 'flex',
    width: '100%',
    paddingTop: '25px',
    paddingBottom: '15px'
  },
  bodyContentMidLeft: {
    width: '50%',
    paddingRight: '20px'
  },
  bodyContentMidRigth: {
    width: '50%',
    paddingLeft: '20px'
  },
  mapStyle: {
    borderRadius: '50px'
  },
  text: {
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  socialIcon: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  bodyContentDesktopCards: {
    width: '100%',
    paddingTop: '25px',
    paddingBottom: '15px'
  },
  contentCards: {
    marginTop: '10px',
    marginBottom: '20px',
    width: '100%'
  },
  offerContainer: {
    width: "100%",
    margin: 20,
    backgroundColor: '#000000'
  },
  mainGridDesktop: {
    paddingTop: 39,
    backgroundColor: '#ffffff'
  },
  contentBodyMobile: {
    width: '100%',
    backgroundColor: '#ffffff'
  },
  headerBodyMobile: {
    marginTop: '20px',
    marginBottom: '20px',
    position: 'relative',
    width: '100%',
    height: 'auto'
  },
  avatarRound: {
    width: '45px',
    height: '45px',
    marginLeft: 20
  },
  title: {
    width: '75%',
    height: '25px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    position: 'absolute',
    top: 3,
    left: 80
  },
  subtitle: {
    width: '75%',
    height: '20px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 28,
    left: 80
  },
  imageSection: {
    position: 'relative',
    width: '100%'
  },
  carousel: {
    maxWidth: '100%',
    height: '200px'
  },
  containerImageDefault: {
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsSection: {
    width: '100%',
    marginTop: '20px'
  },
  headerDetails: {
    width: '50%',
    marginBottom: '15px',
    float: 'left'
  },
  headerDetailsOffers: {
    marginTop: '15px',
    width: '85%',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyDetails: {
    width: '100%'
  },
  fabButton: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    boxShadow:
      '0 2px 6px 0 rgba(0, 0, 0, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ba0d0d',
    top: -20,
    right: 15,
    margin: '0',
    color: '#ffffff',
    zIndex: 1
  },
  label: {
    height: '16px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '34px'
  },
  appBar: {
    position: 'sticky',
    height: '32px',
  },
  positionXIcon: {
    position: 'absolute',
    top: '-6px',
    right: '0px'
  },
  modal: {
    margin: theme.spacing(6)
  },
  mainGridMobile: {
    paddingTop: 39,
    backgroundColor: '#ffffff'
  }
})