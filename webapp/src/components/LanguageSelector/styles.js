export default (theme) => ({
  wrapperSettings: {
    marginTop: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "100%",
    height: '40px',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
  },
  wrapper: {
    color: 'inherit'
  },
  languageText: {
    color: '#121212',
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  languageTextTransparent: {
    color: '#ffffff'
  },
  iconLanguage: {
    color: '#121212',
    width: 24,
    height: 24
  },
  iconLanguageSettings: {
    color: '#121212',
    width: '100%',
    height: 24
  },
  iconLanguageTransparent: {
    color: '#ffffff'
  }
})