import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)

const SignupRoleSelector = ({ onSubmit }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.wrapperRoleSelector}>
      <Button
        className={classes.btn}
        variant="contained"
        color="secondary"
        onClick={() => {
          onSubmit('donor')
        }}
      >
        {t('signup.asAdonor')}
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="secondary"
        onClick={() => {
          onSubmit('sponsor')
        }}
      >
        {t('signup.asAsponsor')}
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="secondary"
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
