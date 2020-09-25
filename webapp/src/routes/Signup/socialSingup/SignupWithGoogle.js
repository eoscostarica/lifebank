import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import GoogleLogin from 'react-google-login';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  btnGoogle: {
    display: 'block',
    marginBottom: theme.spacing(2),
    width: "40%",
    backgroundColor: "white",
    color: "#757575",
    fontFamily: "Roboto",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
    margin: "auto",
    '@media only screen and (max-width: 900px)': {
      width: "100%",
    },
    textTransform: "none",
  },

  googleIcon: {
    background: "blue",
    borderRadius: "2px"
  }

}))

const SignupWithGoogle = () => {
  const classes = useStyles()

  const responseGoogle = (response) => {
    console.log(response.profileObj.email);
    console.log(response.profileObj.name);
  }


  const handleError = (error) => {
    console.log("Error")
    console.log(error);
  }

  return (
    <GoogleLogin
      clientId="865299157499-ht14599cb2vaqgnq0vhkihsedsfvcukf.apps.googleusercontent.com"
      render={renderProps => (
        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.btnGoogle}>
          Sign up with Google
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={handleError}
      cookiePolicy={'single_host_origin'}
    />
  )
}

SignupWithGoogle.propTypes = {}

SignupWithGoogle.defaultProps = {}

export default SignupWithGoogle

