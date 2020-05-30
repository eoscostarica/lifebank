import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import LifeBankIcon from '../../components/LifebankIcon'

const useStyles = makeStyles((theme) => ({
  contentInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3, 1),
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
    '& hr': {
      marginBottom: theme.spacing(2)
    }
  }
}))

const About = () => {
  const classes = useStyles()

  return (
    <Box className={classes.contentInfo}>
      <LifeBankIcon color="#000" />
      <Typography variant="body1">
        Recently, this need hit close to home. One of our team member’s father
        was diagnosed with cancer and consequently needed a blood transfusion.
        As he recovered, he only asked his family one simple request: to help
        him pay his new lease on life by donating blood.
      </Typography>
      <Typography variant="body1">
        This was a wakeup call to our team and we all understood the importance
        of donating blood.
      </Typography>
      <Typography variant="body1">
        Now, amid the COVID-19 outbreak, blood banks are in urgent need of
        donors. People who are potential qualifying donors are prompted to stay
        home and isolate. As donations plummet and demand for blood and plasma
        increases, blood banks are experiencing a pronounced global shortage.
      </Typography>
      <Typography variant="body1">
        Moreover, the pandemic is impacting local economies due to a generalized
        lockdown. Small businesses that rely on the local community must think
        of ways to incentivize customers to buy as soon as restrictions are
        lifted. Small businesses also need a lifeline.
      </Typography>
      <Typography variant="body1">
        We identified two main problems: a blood donation shortage and a local
        economic slowdown. We hurried to the drawing board to create a solution
        : Lifebank.
      </Typography>
      <Typography variant="body1">
        Lifebank is an EOSIO-based dapp that helps local communities create a
        virtuous circle of value exchange between three parties — eligible life
        donors, community donation centers, and participating local businesses
        we call sponsors.
      </Typography>

      <Typography variant="h5">So, how does it work?</Typography>
      <Divider />

      <Typography variant="body1">
        First, a potential donor can access the Lifebank app to find the closest
        donation center. The donor can then visit the center where they will be
        deemed eligible to receive a LifeToken in exchange for a donation.
        Later, the donor can find local businesses where to redeem the token
        using the app. To become a LifeBank, a donation center must first
        register on the Lifebank application and accept the terms. These
        donation centers will be in charge of qualifying life donors, keeping
        all their personal information and acknowledging donations to issue a
        LifeToken.
      </Typography>
      <Typography variant="body1">
        Finally, sponsors are local businesses or organizations that can also
        register using the Lifebank app. The business will be able to create a
        profile and offer products, services or discounts in exchange for a
        LifeToken. Sponsors can then accept LifeTokens from a life donor that
        wishes to buy their goods or services.
      </Typography>
      <Typography variant="body1">
        Lifebank is being developed by the EOS Costa Rica team. We build
        EOSIO-based solutions to solve real world problems.
      </Typography>
      <Typography variant="body1">
        We can't let life banks go dry and we need to support our local
        businesses. This is a matter of life and death for many people around
        the globe. Support this project to give life and save lives.
      </Typography>

      {/* @TODO: Add video information here */}
    </Box>
  )
}

export default About
