import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import Divider from '@material-ui/core/Divider'
import NewNotificationIcon from '@material-ui/icons/Brightness1';
import OldNotificationIcon from '@material-ui/icons/PanoramaFishEye';
import { useQuery } from '@apollo/react-hooks'
import { GET_NAME } from '../../gql'




const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },

  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  box: {
    display: 'inline-block'
  },
  iconOption: {
    color: '#ba0d0d',
    fontSize: 20
  }
}))
const NotificationStructure = ({ title, description, type, payload, state }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  // const [userName, setUsername] = useState()
  const [name, setName] = useState()
  // const { error: errorUsername, refetch: getData } = useQuery(GET_NAME, {
  //   variables: {
  //     account: "lifsxd4d4bo3"
  //   },
  //   skip: true

  // })

  const { refetch: getData } = useQuery(GET_NAME, {
    variables: {
      account: description.substring(5, 17)
    },
    skip: true
  })


  useEffect(() => {
    const response = async () => {
      const { data } = await getData({ account: description.substring(5, 17) })
      console.log(data)
    }

    response()
  })

  // description.substring(5, 17)


  return (

    <Box className={classes.wrapper}>
      <Box >
        <Typography className={classes.labelOption}>
          {title}
        </Typography>
        <Typography className={classes.labelOption}>
          {description}
        </Typography>


        {state === false && (
          <NewNotificationIcon className={classes.iconOption} />

        )}
        {state === true && (
          <OldNotificationIcon className={classes.iconOption} />
        )}
      </Box>
      <Divider />
    </Box>


  )
}

NotificationStructure.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  payload: PropTypes.object,
  state: PropTypes.bool,

}
export default NotificationStructure