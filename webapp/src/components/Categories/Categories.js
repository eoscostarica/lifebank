import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'

const AMPM = ['am', 'pm']
const useStyles = makeStyles((theme) => ({
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
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxDivider: {
    width: '100%',
    padding: theme.spacing(0, 1)
  }
}))

const getWeekCategoryXSorted = (data) => {
  const sorter = {
    Discounts: 0,
    FreeProducts: 1,
    Coupons: 2,
    Benefits: 3,
    Badges: 4
  }

  return data.sort((a, b) => {
    const category1 = a.category.toLowerCase()
    const category2 = b.category.toLowerCase()
    return sorter[category1] - sorter[category2]
  })
}

const getHours = () => {
  const times = []

  for (let s = 6; s < 24; s++) {
    const hour = s % 12
    times.push({
      label: (hour || '12') + ':00' + AMPM[Math.floor(s / 12)],
      value: ('0' + s).slice(-2) + ':00'
    })
  }

  return times
}

const convertHour = (time) => {
  const hour = time % 12

  return (hour || '12') + ':00' + AMPM[Math.floor(time / 12)]
}

const Categories = ({
  handleOnAddCategories,
  CategoriesLoad,
  data,
  loading,
  showCategories,
  showButton
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [category, setcategory] = useState('Discounts')
  const theme = useTheme()
  const [CategoriesList, setCategoriesList] = useState([])
  const [Categories, setCategories] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const CategoryX = [
    { value: 'Discounts', label: t('categories.discounts') },
    { value: 'FreeProducts', label: t('categories.freeproducts') },
    { value: 'Coupons', label: t('categories.coupons') },
    { value: 'Benefits', label: t('categories.benefits') },
    { value: 'Badges', label: t('categories.badges') }

  ]
  const hours = getHours()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const handleChangecategory = (event) => {
    setcategory(event.target.value)
  }

  const handleAddCategoriesPercategory = () => {
    const isRepeated = Categories.some((item) => item.category === category)

    !isRepeated && setCategories([...Categories, { category }])
  }

  const loadCategories = () => {
    if (CategoriesLoad) setCategories(JSON.parse(CategoriesLoad))
  }

  const handleDeleteCategoriesPercategory = (item) => {
    const newCategories = Categories.filter(({ category }) => category !== item)
    setCategories(newCategories)
  }

  const handleOpen = () => {
    setOpenModal(!openModal)
    if (loading) loadCategories(CategoriesLoad)
  }

  const onHandleOnAddCategories = () => {
    handleOnAddCategories(Categories)
    setOpenModal(false)
  }

  useEffect(() => {
    if (data) showCategories && setCategoriesList(getWeekCategoryXSorted(data))
  }, [showCategories, data])

  return (
    <>
      {showButton && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          fullWidth
          className={classes.addBtn}
        >
          {t('categories.addCategories')}
        </Button>
      )}
      {showCategories &&
        CategoriesList.map((CategoriesItem) => (
          <Box key={CategoriesItem.category} className={classes.resultList}>
            <List>
              <ListItem>
                <Box className={classes.boxDivider}>
                  <Divider />
                </Box>
                <Box className={classes.CategoriesListResult}>
                  <Typography variant="h6">{CategoriesItem.category}</Typography>
                  <Typography variant="body1">
                    {`${convertHour(
                      CategoriesItem.open.split(':')[0]
                    )} - ${convertHour(CategoriesItem.close.split(':')[0])}`}
                  </Typography>
                </Box>
                <Box className={classes.boxDivider}>

                  <Divider />
                </Box>
              </ListItem>
            </List>
          </Box>
        ))}
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => { }}
        fullScreen={!isDesktop}
        maxWidth='xs'
        fullWidth
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialog}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box className={classes.root}>
            <Typography variant="h3">
              {t('categories.chooseYourCategories')}
            </Typography>
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label={t('categories.category')}
              value={category}
              onChange={handleChangecategory}
              variant="outlined"
            >
              {CategoryX.map((option) => {
                const isSelected = Categories.some(
                  ({ category }) => category === option.value
                )

                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    disabled={isSelected}
                    selected={isSelected}
                  >
                    {option.label}
                  </MenuItem>
                )
              })}
            </TextField>

            <Button
              className={classes.addBtn}
              variant="contained"
              color="default"
              onClick={handleAddCategoriesPercategory}
            >
              {t('miscellaneous.add')}
            </Button>
            <Box className={classes.list}>
              <List className={classes.CategoriesList}>
                {Categories.map((item) => (
                  <div key={item.category}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={t(`categories.${item.category.toLowerCase()}`)}
                      />
                      <IconButton
                        onClick={() => handleDeleteCategoriesPercategory(item.category)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Box>
            {Boolean(Categories.length) && (
              <Button
                className={classes.saveBtn}
                variant="contained"
                color="primary"
                onClick={onHandleOnAddCategories}
              >
                {t('common.save')}
              </Button>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

Categories.propTypes = {
  handleOnAddCategories: PropTypes.func,
  CategoriesLoad: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
  showCategories: PropTypes.bool,
  showButton: PropTypes.bool
}

Categories.defaultProps = {
  handleOnAddCategories: () => { },
  CategoriesLoad: '',
  data: null,
  loading: false,
  showCategories: false,
  showButton: true
}

export default Categories
