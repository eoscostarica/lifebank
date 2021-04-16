export default (theme) => ({
  contentInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3, 1),
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      marginTop: theme.spacing(2)
    }
  },
  boxLinks: {
    display: 'flex',
    marginTop: theme.spacing(3),
    '& a': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '& svg': {
      marginRight: theme.spacing(3),
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    },
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      marginTop: 0
    }
  }
})