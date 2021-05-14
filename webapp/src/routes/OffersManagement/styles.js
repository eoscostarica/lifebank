export default (theme) => ({
  dialog: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '48px',
      paddingLeft: '48px',
      paddingRight: '48px'
    }
  },
  form: {
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2)
    }
  },
  radioGroup: {
    width: '100%'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginBottom: '20px',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '5px',
    width: '100%'
  },
  limitationHandlingPaper: {
    width: '100%',
  },
  addButtonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  },
  titleModal: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 15
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  dateContainer: {
    width: '100%'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  backIcon: {
    color: '#121212'
  },
  titleAppBar: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  },
  carrouselContainer: {
    maxWidth: '100%',
    height: '300'
  },
  saveBtn: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: '100%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 20,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  title: {
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15
  },
  contentIcon: {
    width: "100%",
    padding: theme.spacing(2)
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
    }
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  carouselContainer: {
    maxWidth: '100%',
    height: "300"
  },
  descriptionContainer: {
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(3)
  },
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    height: 'calc(100vh - 60px)',
    width: "90%",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  btnAction: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "50%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: "100%"
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: 'white'
  },
  formControl: {
    width: '100%'
  },
  tableContent: {
    paddingTop: "30px",
    width: "100%"
  },
  limitationHandling: {
    borderRadius: 15,
    width: "100%"
  }
})