export default (theme) => ({
  imageContainer: {
    width: "100%",
    maxHeight: 200,
    margin: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& > div.MuiCard-root': {
      padding: theme.spacing(2),
      backgroundColor: 'transparent',
      border: '1px solid lightgray'
    }
  },

  logo: {
    maxWidth: '100%',
    maxHeight: 150,
    margin: 'auto'
  }
})