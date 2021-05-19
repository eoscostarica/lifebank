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
import styles from './styles'

const useStyles = makeStyles(styles)

const getWeekCategoryXSorted = (data) => {
  const sorter = {
    discount: 0,
    freeProduct: 1,
    coupon: 2,
    benefit: 3,
    badge: 4
  }

  return data.sort((a, b) => {
    const category1 = a.category.toLowerCase()
    const category2 = b.category.toLowerCase()
    return sorter[category1] - sorter[category2]
  })
}

const Categories = ({
  handleOnAddCategories,
  categoriesLoad,
  data,
  loading,
  showCategories,
  showButton
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [category, setcategory] = useState('discount')
  const theme = useTheme()
  const [CategoriesList, setCategoriesList] = useState([])
  const [Categories, setCategories] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const CategoryX = [
    { value: 'discount', label: t('categories.discount') },
    { value: 'freeProduct', label: t('categories.freeProduct') },
    { value: 'coupon', label: t('categories.coupon') },
    { value: 'benefit', label: t('categories.benefit') },
    { value: 'badge', label: t('categories.badge') }

  ]

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
    if (categoriesLoad) setCategories(JSON.parse(categoriesLoad))
  }

  const handleDeleteCategoriesPercategory = (item) => {
    const newCategories = Categories.filter(({ category }) => category !== item)
    setCategories(newCategories)
  }

  const handleOpen = () => {
    setOpenModal(!openModal)
    if (loading) loadCategories(categoriesLoad)
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
                  <Typography variant="h6">{t(`categories.${CategoriesItem.category}`)}</Typography>
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
                        primary={t(`categories.${item.category}`)}
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
  categoriesLoad: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
  showCategories: PropTypes.bool,
  showButton: PropTypes.bool
}

Categories.defaultProps = {
  handleOnAddCategories: () => { },
  categoriesLoad: '',
  data: null,
  loading: false,
  showCategories: false,
  showButton: true
}

export default Categories
