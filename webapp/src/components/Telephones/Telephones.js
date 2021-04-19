import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import PhoneIcon from '@material-ui/icons/Phone'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import styles from './styles'

const useStyles = makeStyles(styles)

const Telephones = ({ phones, showDelete, deletePhone }) => {
  const classes = useStyles()
  return (
    <>
      {phones && (
        <Paper className={classes.root}>
          <List component="nav">
            {phones.map((phone, key) => (
              <ListItem key={key} button>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={phone} />
                {showDelete && (
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => deletePhone(phone)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  )
}

Telephones.propTypes = {
  phones: PropTypes.array,
  showDelete: PropTypes.bool,
  deletePhone: PropTypes.func
}

export default Telephones
