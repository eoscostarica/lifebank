
import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OpacityIcon from '@material-ui/icons/Opacity';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center',
    backgroundColor: "white",
    margin: "auto",
    "@media only screen and (max-width: 900px)": {
      width: "100%",
    },
  },
  mainCointainer: {
    width: "60%",
    margin: "auto",
    marginTop: 10,
    "@media only screen and (max-width: 900px)": {
      width: "100%",
    },
  },
  title: {
    fontSize: 48,
  },
  subTitle: {
    fontSize: 25,
    marginBottom: theme.spacing(2)
  },
  imgBanner: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    marginBottom: 10,
    "@media only screen and (max-width: 900px)": {
      height: "200px",
      marginBottom: 0,
    },
  },
  priceContainer: {
    padding: 10
  },
  text: {
    fontSize: 18,
    textAlign: "justify",
    marginBottom: 10
  },
  tokenPrice: {
    fontSize: 18,
    textAlign: "left",
  },
  price: {
    fontSize: 25,
    textAlign: "center",
  },
  redeemButton: {
    width: "100%",
    backgroundColor: "#F20833"
  }
}))

const OfferPage = () => {
  const classes = useStyles()
  let { id } = useParams();
  return (
    <>
      <Box className={classes.wrapper}>
        <Grid
          className={classes.mainCointainer}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} >
            <Typography variant="h1" className={classes.title}>10% off on reservations</Typography>
            <Typography variant="h2" className={classes.subTitle}>Hotel Caribe</Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} md={8}>
            <p className={classes.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.priceContainer}>
              <Typography variant="h3" className={classes.tokenPrice}> Expiration date: 12/12/20</Typography>
              <Typography variant="h3" className={classes.tokenPrice}> Token price:2</Typography>
              <Button variant="contained" color="primary" className={classes.redeemButton}>redeem</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <img className={classes.imgBanner} src="https://images.sunwingtravelgroup.com/repo_min/sunwingca/custom/promotions/sliders/default/mobile-en.jpg" />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OfferPage