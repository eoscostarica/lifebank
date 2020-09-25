import React, { useState, useEffect } from 'react'
import { FacebookProvider, Login } from 'react-facebook';
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'



const useStyles = makeStyles((theme) => ({
  btnFacebook: {
    display: 'block',
    backgroundColor: "#1778f2",
    color: "White",
    marginBottom: theme.spacing(2),
    width: "40%",
    margin: "auto",
    '@media only screen and (max-width: 900px)': {
      width: "100%",
    },
    textTransform: "none",
  }
}))


const SignupWithFacebook = () => {
  const classes = useStyles()
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    //console.log(response);
    console.log(response.profile.email);
    console.log(response.profile.name);
  }

  const handleError = (error) => {
    console.log("Error")
    console.log(error);
  }

  return (
    <>
      <FacebookProvider appId="641671940102186">
        <Login
          scope="email"
          onCompleted={responseFacebook}
          onError={handleError}
        >
          {({ handleClick, error, data }) => (
            <Button onClick={handleClick} className={classes.btnFacebook}>
              Sign up with Facebook
            </Button>
          )}
        </Login>
      </FacebookProvider>
    </>

  )
}

SignupWithFacebook.propTypes = {}

SignupWithFacebook.defaultProps = {}

export default SignupWithFacebook
