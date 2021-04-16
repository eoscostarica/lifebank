export default (theme) => ({
  titleMainSection: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal'
  },
  SubtitleSection: {
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal'
  },
  mainGridDesktop: {
    paddingTop: 39,
    paddingLeft: 20,
    paddingRigth: 20,
    paddingBottom: 30
  },
  generalDescription: {
    marginTop: 10,
    paddingLeft: 5
  },
  description: {
    marginBottom: 5
  },
  showOffers: {
    paddingTop: 39,
    paddingLeft: 20,
    paddingRigth: 20,
    paddingBottom: '15%'
  },
  boxSelect: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  formControl: {
    margin: theme.spacing(2),
    marginLeft: 25,
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  snackbar: {
    marginRight: 100,
    backgroundColor: 'white',
    color: 'black'
  }
})