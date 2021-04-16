export default (theme) => ({
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
  iconLanguageTransparent: {
    color: '#ffffff'
  }
})