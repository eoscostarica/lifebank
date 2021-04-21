export default (theme) => ({
  cardRoot: {
    whiteSpace: 'normal',
    display: 'inline-block',
    position: 'relative',
    width: '265px',
    height: '145px',
    padding: 10,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  cardHeader: {
    padding: 0,
    margin: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cardAvatar: {
    height: '40px',
    width: '40px'
  },
  cardTitleContainer: {
    width: '60%'
  },
  cardTitle: {
    marginLeft: 7,
    marginTop: 10,
    width: '100%',
    fontFamily: 'Roboto',
    fontsize: '16px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  cardIconOffer: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 20,
    top: 20,
    right: 15
  },
  cardContent: {
    marginTop: 10,
    padding: 0
  },
  cardContentText: {
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
  cardActions: {
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  cardActionButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1',
    textAlign: 'center',
    color: '#121212'
  }
})