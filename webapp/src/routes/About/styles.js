export default (theme) => ({
  contentInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(2, 1),
    '& svg': {
      fontSize: 50,
      marginBottom: theme.spacing(3)
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(2)
    },
    '& h4': {
      marginBottom: theme.spacing(2)
    }
  },
  video: {
    margin: 'auto',
    maxWidth: '800px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '1rem'
  }
})