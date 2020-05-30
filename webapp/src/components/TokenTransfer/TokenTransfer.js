import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import SendIcon from '@material-ui/icons/Send'
import Link from '@material-ui/core/Link'
import QrReader from 'react-qr-scanner'
import CropFreeIcon from '@material-ui/icons/CropFree'
import InputAdornment from '@material-ui/core/InputAdornment'

import { TRANSFER_MUTATION } from '../../gql'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '80%',
    width: 350,
    outlineWidth: 0
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textFieldWrapper: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  btnWrapper: {
    display: 'flex'
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center'
  },
  labelOption: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(3),
    fontSize: 14
  },
  bodyWrapper: {
    height: '90%',
    padding: theme.spacing(0, 2)
  }
}))

const TokenTransfer = ({ overrideBoxClass, overrideLabelClass }) => {
  const classes = useStyles()
  const [payload, setPayload] = useState({ quantity: 1 })
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const [loadingQr, setLoadingQr] = useState(false)

  const [
    transfer,
    { loading, error, data: { transfer: transferResult } = {} }
  ] = useMutation(TRANSFER_MUTATION)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSetField = (field, value) => {
    setPayload({ ...payload, [field]: value })
  }

  const handleSubmit = () => {
    setErrorMessage(null)
    transfer({
      variables: {
        ...payload
      }
    })
  }

  useEffect(() => {
    if (!error) {
      return
    }

    setErrorMessage(error.message.replace('GraphQL error: ', ''))
  }, [error])

  useEffect(() => {
    if (!transferResult) {
      return
    }

    setPayload({ quantity: 1 })
    setSuccess(true)
  }, [transferResult])

  // @todo hide quantity for lifebank
  // @todo change text according to user role

  return (
    <>
      <Box
        className={clsx(classes.loginBtn, overrideBoxClass)}
        onClick={handleOpen}
      >
        <SendIcon />
        <Typography
          variant="body1"
          className={clsx(classes.labelOption, overrideLabelClass)}
        >
          Transfer
        </Typography>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Box className={classes.closeIcon}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleOpen}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Box className={classes.bodyWrapper}>
              <Typography variant="h3">Token transfer</Typography>
              {errorMessage && (
                <Alert
                  className={classes.alert}
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setErrorMessage(null)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              )}
              {success && (
                <Alert
                  className={classes.alert}
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setSuccess(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Done
                  <Link
                    href={`https://jungle.bloks.io/account/${transferResult.transaction_id}`}
                    target="_blank"
                    rel="noopener"
                    color="secondary"
                  >
                    {transferResult.transaction_id}
                  </Link>
                </Alert>
              )}
              <form autoComplete="off">
                <Box className={classes.textFieldWrapper}>
                  {loadingQr && (
                    <QrReader
                      delay={100}
                      onError={() => {}}
                      facingMode="rear"
                      style={{
                        height: 220,
                        width: '100%',
                        backgroundColor: 'grey',
                        marginBottom: 24
                      }}
                      onScan={(value) =>
                        handleSetField('to', value || payload.to)
                      }
                    />
                  )}
                  <TextField
                    id="to"
                    label="Account"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={payload.to || ''}
                    onChange={(event) =>
                      handleSetField('to', event.target.value)
                    }
                    className={classes.textField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CropFreeIcon
                            onClick={() => setLoadingQr(!loadingQr)}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    id="memo"
                    label="Memo"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={payload.memo || ''}
                    onChange={(event) =>
                      handleSetField('memo', event.target.value)
                    }
                    className={classes.textField}
                  />
                  <TextField
                    id="quantity"
                    label="Quantity"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={payload.quantity || ''}
                    onChange={(event) =>
                      handleSetField('quantity', parseInt(event.target.value))
                    }
                    className={classes.textField}
                  />
                </Box>
                <Box className={classes.btnWrapper}>
                  <Button
                    disabled={
                      !payload.to ||
                      !payload.quantity ||
                      !payload.memo ||
                      loading
                    }
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Send
                  </Button>
                  {loading && <CircularProgress />}
                </Box>
              </form>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

TokenTransfer.propTypes = {
  overrideBoxClass: PropTypes.any,
  overrideLabelClass: PropTypes.any
}

export default TokenTransfer
