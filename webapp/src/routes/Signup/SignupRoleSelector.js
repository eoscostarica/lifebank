import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AddBoxIcon from '@material-ui/icons/AddBox'
import FavoriteIcon from '@material-ui/icons/Favorite'

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
        As a Donor
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
        As a Sponsor
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
        As a Bank
      </Button>
    </Box>
  )
}

SignupRoleSelector.propTypes = {
  onSubmit: PropTypes.func
}

SignupRoleSelector.defaultProps = {}

export default SignupRoleSelector
