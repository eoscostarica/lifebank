import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AddBoxIcon from '@material-ui/icons/AddBox'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  btn: {
    margin: theme.spacing(1.5, 1)
  }
}))

const SignupRoleSelector = ({ onSubmit }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        startIcon={<FavoriteIcon />}
        onClick={() => {
          onSubmit('donor')
        }}
      >
        {t('signup.asAdonor')}
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
        onClick={() => {
          onSubmit('sponsor')
        }}
      >
        {t('signup.asAsponsor')}
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        startIcon={<AddBoxIcon />}
        onClick={() => {
          onSubmit('lifebank')
        }}
      >
        {t('signup.asAbank')}
      </Button>
    </Box>
  )
}

SignupRoleSelector.propTypes = {
  onSubmit: PropTypes.func
}

SignupRoleSelector.defaultProps = {}

export default SignupRoleSelector
