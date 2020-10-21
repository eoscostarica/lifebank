import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import VideoSection from '../../components/VideoSection'

const useStyles = makeStyles((theme) => ({
  contentInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(2, 1),
    '& svg': {
      fontSize: 50,
      marginBottom: theme.spacing(3)
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(2)
    },
    '& h4': {
      marginBottom: theme.spacing(2)
    }
  },
  video: {
    margin: "auto",
    maxWidth: "800px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "1rem"
  }
}))

const About = () => {
  const classes = useStyles()

  return (
    <Box className={classes.contentInfo}>
      <VideoSection
        src="https://www.youtube.com/embed/tgbZWs5vE5s"
        className={classes.video}
      />
      <Typography variant="h4">About Lifebank:</Typography>
      <Typography variant="body1">
        Lifebank is an EOSIO-based dapp that helps local communities create a
        virtuous circle of value exchange between three parties — eligible life
        donors, community donation centers, and participating local businesses
        (sponsors).
      </Typography>
      <Typography variant="body1">
        Lifebank is an initiative of EOS Costa Rica, a company that develops
        blockchain-based solutions to solve real-world problems. Lifebank is our
        entry to the Coding for Change challenge organized by leading blockchain
        company, Block.one.
      </Typography>

      <Typography variant="h4">The Story Behind Lifebank:</Typography>
      <Typography variant="body1">
        We identified two main problems: a blood donation shortage and a local
        economic slowdown. Amid the COVID-19 outbreak, blood banks urgently need
        donors. People who are potential qualifying donors are prompted to stay
        home and isolate. As donations plummet and demand for blood and plasma
        increases, blood banks are experiencing a pronounced global shortage.
      </Typography>
      <Typography variant="body1">
        Moreover, the pandemic is impacting local economies due to a generalized
        lockdown. Small businesses that rely on the local community must think
        of ways to incentivize customers to buy as soon as restrictions are
        lifted.
      </Typography>

      <Typography variant="h4">About Life Tokens:</Typography>
      <Typography variant="body1">
        A donor can earn life tokens after completing a blood donation at a
        Lifebank participating donation center. Donation centers can issue a
        maximum of 10,000 life tokens. These tokens can then be redeemed by the
        donor at any local business (or sponsor) in exchange for discounts or
        promotions.
      </Typography>
      <Typography variant="body1">
        Also, sponsors can save these tokens and then return them to donation
        centers to keep the tokens active.
      </Typography>
    </Box>
  )
}

export default About
