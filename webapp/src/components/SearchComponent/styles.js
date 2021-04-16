export default (theme) => ({
  wrapper: {
    color: 'inherit'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  appBar: {
    height: "60px",
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  contentBox: {
    height: "calc(100vh - 60px)",
  },
  backIcon: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  recordingIcon: {
    color: '#ba0d0d'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  },
  input: {
    width: "90%",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.15px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
  },
  titleMainSection: {
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal',
    marginTop: 20,
    marginLeft: 15
  }
})