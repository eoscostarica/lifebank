import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)

const ViewCategories = ({ categories }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <>
      {JSON.parse(categories).map((categoriesItem, index) => (
        <Typography
          key={index}
          className={classes.text}
          id={index}
          variant="body1"
        >
          {t(`categories.${categoriesItem.category}`)}
        </Typography>
      ))}
    </>
  )
}

ViewCategories.propTypes = {
  categories: PropTypes.any
}

export default ViewCategories
