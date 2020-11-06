import React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import InputBase from '@material-ui/core/InputBase'
import MicIcon from '@material-ui/icons/Mic'
import { useTranslation } from 'react-i18next'


const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  backIcon: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  },
  input: {
    width: "90%",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.15px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
  }

}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SeachComponent = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <SearchIcon className={classes.iconBottomAppBar} />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.backIcon}
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search"
            />
            <IconButton
              className={classes.backIcon}
            >
              <MicIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List />
      </Dialog>
    </>
  )
}

SeachComponent.propTypes = {}

export default SeachComponent
