export default (theme) => ({
  root: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(4),
    '& h3': {
      marginBottom: theme.spacing(3)
    }
  },
  CategoriesList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  dialog: {
    paddingTop: "20px",
    paddingLeft: "30px",
    paddingBottom: "20px"
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
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  list: {
    overflowY: 'auto',
    marginBottom: '5px'
  },
  saveBtn: {
    marginTop: '4%',
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
    padding: '15px'
  },
  addBtn: {
    marginTop: '4%',
    borderRadius: '50px',
    width: "100%",
    height: '40px',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.5px',
    textAlign: 'center',
    padding: '15px',
    objectFit: 'contain',
    boxShadow: 'inset 0 100px 0 0 rgba(255, 255, 255, 0.08)',
    border: 'solid 1px rgba(0, 0, 0, 0.54)',
    backgroundColor: '#ffffff'
  },
  resultList: {
    width: '100%',
    '& li': {
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      '& p': {
        whiteSpace: 'nowrap',
        letterSpacing: '0.5px'
      }
    }
  },
  CategoriesListResult: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxDivider: {
    width: '100%',
    padding: theme.spacing(0, 1)
  }
})