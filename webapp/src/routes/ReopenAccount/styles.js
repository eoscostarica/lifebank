export default (theme) => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    height: 'calc(100vh - 60px)'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  centerText: {
    textAlign: 'center',
  },
  title: {
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 30
  },
  btnHome: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    width: "100%"
  },
  btnReturn: {
    borderRadius: '50px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#121212',
    padding: '12px',
    marginBottom: 10,
    width: "100%"
  }
})