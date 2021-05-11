export default (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '994px',
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    paddingTop: '60px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '5%',
      paddingRight: '5%'
    },
  },
  wrapperMobile: {
    display: 'flex',
    flexDirection: 'column',
    width: '994px',
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    paddingTop: '10px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '5%',
      paddingRight: '5%'
    },
  },
  title: {
    fontSize: 48,
    marginBottom: theme.spacing(4)
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    }
  },
  titleBox: {
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'center'
  },
  mobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    paddingTop: '20px',
    [theme.breakpoints.up('md')]: {
      padding: '0 1%'
    },
  },
  editBtn: {
    marginTop: theme.spacing(4)
  },
  linkSuccess: {
    textDecoration: 'none',
    color: 'rgb(26, 64, 28)'
  },
  linkError: {
    textDecoration: 'none',
    color: 'rgb(91, 22, 21)'
  },
  boxMessage: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  form: {
    width: '100%',
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1)
    }
  },
  textFieldWrapperSponsor: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& > div.MuiFormControl-root': {
      width: '100%'
    }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  boxBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& a': {
      textDecoration: 'none'
    }
  },
  labelBtn: {
    color: theme.palette.white
  },
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  levelReward: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiTextField-root': {
      width: 65,
      margin: '0px !important',
      '& input': {
        textAlign: 'center'
      }
    },
    '& h4': {
      letterSpacing: '0.25px',
      width: '65%'
    }
  },
  text: {
    color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
    margin: theme.spacing(1, 0)
  },
  boldText: {
    fontWeight: 'bold',
    width: "100%",
    textAlign: "left",
    marginBottom: '8px',
  },
  boldTextSocialMedia: {
    fontWeight: 'bold',
    width: "100%",
    textAlign: "left",
  },
  divider: {
    marginTop: '30px',
    marginBottom: '5px',
    width: '100%'
  },
  markLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontSize: 18
    }
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  scheduleBoxWrp: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scheduleBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '234px'
  },
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginLeft: theme.spacing(3)
  },
  addButtonContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  marginTitle:
  {
    marginTop: '3%'
  },
  carouselDiv: {
    width: '100%',
    objectFit: 'cover'
  },
  carouselContainer: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  img: {
    maxWidth: '100%',
    objectFit: 'cover',
    marginBottom: '6%',
  },
  routerLink: {
    width: "100%",
    textDecoration: "none",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  saveBtn: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
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
      width: "100%",
    },
  },
  rightBox: {
    width: '100%',
    paddingLeft: '8px'
  },
  leftBox: {
    width: '100%',
    paddingRight: '8px'
  },
  cancelBtn: {
    borderRadius: '50px',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '1px',
    textAlign: 'center',
    padding: '12px',
    border: 'solid 1px rgba(0, 0, 0, 0.54)',
    backgroundColor: '#ffffff',
    marginBottom: 20,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
  },
  noCapitalize: {
    textTransform: 'none !important'
  },
  textField: {
    overflowY: 'none',
    margin: theme.spacing(2, 0)
  },
  mobileTextField: {
    height: 'auto',
    overflowY: 'none',
    margin: theme.spacing('4px', 0)
  },
  textFieldSocialMedia: {
    height: 'auto',
    overflowY: 'none',
  },
  mapField: {
    overflowY: 'none',
    margin: theme.spacing(2, 0),
    width: '100%',
    height: '287px'
  },
  sponsorType: {
    height: 'auto',
    overflowY: 'none',
    width: '100%',
    paddingBottom: '4px'
  },
  logo: {
    maxWidth: '100%',
    maxHeight: 340
  },
  addBtn: {
    color: 'white',
    margin: theme.spacing(2, 0)
  },
  socialMediaLinksContainer: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: '1px dashed lightgray'
  }
})
