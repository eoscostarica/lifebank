import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import GoogleLogin from 'react-google-login'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import { useTranslation } from 'react-i18next'

import { oAuthConfig } from '../../../config'

const useStyles = makeStyles((theme) => ({
  btnGoogle: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    width: '40%',
    backgroundColor: 'white',
    color: '#757575',
    border: 'solid 1px #e0e0e0',
    margin: 'auto',
    '@media only screen and (max-width: 900px)': {
      width: '100%'
    },
    textTransform: 'none'
  },
  googleIcon: {
    marginRight: 5
  }
}))

const SignupWithGoogle = ({ handlerSubmit }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const googleResponse = (response) => {
    handlerSubmit(
      true,
      response.profileObj.email,
      response.profileObj.name,
      response.profileObj.googleId
    )
  }

  const handleError = (error) => {
    if (error) handlerSubmit(false, '', '', '')
  }

  return (
    <GoogleLogin
      clientId={oAuthConfig.google_clienteID}
      render={(handleProps) => (
        <Button
          onClick={handleProps.onClick}
          className={classes.btnGoogle}
          startIcon={
            <SvgIcon
              className={classes.googleIcon}
              shapeRendering="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </SvgIcon>
          }
        >
          {t('signup.signupWithGoogle')}
        </Button>
      )}
      buttonText="Login"
      onSuccess={googleResponse}
      onFailure={handleError}
      cookiePolicy="single_host_origin"
    />
  )
}

SignupWithGoogle.propTypes = {
  handlerSubmit: PropTypes.func
}

SignupWithGoogle.defaultProps = {}

export default SignupWithGoogle
