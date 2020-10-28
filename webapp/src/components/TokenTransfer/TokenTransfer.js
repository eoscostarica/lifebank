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
import InputAdornment from '@material-ui/core/InputAdornment'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { useTranslation } from 'react-i18next'

import { useUser } from '../../context/user.context'
import { TRANSFER_MUTATION } from '../../gql'
import { eosConfig } from '../../config'

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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '& button': {
      width: '80%'
    }
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
    overflow: 'scroll',
    padding: theme.spacing(0, 2),
    '& h1': {
      fontSize: 48,
      textAlign: 'center',
      fontWeight: 'normal',
      lineHeight: '45px',
      marginBottom: theme.spacing(5)
    },
    '& h4': {
      fontSize: 34,
      letterSpacing: '0.25',
      color: theme.palette.secondary.main,
      fontWeight: 'normal',
      textAlign: 'center',
      margin: theme.spacing(2, 0)
    }
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  AddInput: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    '& svg': {
      fontSize: 48
    },
    '& .MuiTextField-root': {
      width: 100,
      '& input': {
        textAlign: 'center'
      }
    }
  },
  cancelBtn: {
    display: 'flex',
    margin: theme.spacing(2, 0),
    justifyContent: 'center'
  }
}))

const TokenTransfer = ({ overrideBoxClass, overrideLabelClass, useButton }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [currentUser] = useUser()
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

  return (
    <>
      {!currentUser && <span>Login or signup</span>}
      {currentUser && (
        <>
          <Box
            className={clsx(classes.loginBtn, overrideBoxClass)}
            onClick={handleOpen}
          >
            {useButton ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
              >
                {t('tokenTransfer.redeemToken')}
              </Button>
            ) : (
              <>
                <SendIcon className={classes.iconOption} />
                <Typography
                  variant="body1"
                  className={clsx(classes.labelOption, overrideLabelClass)}
                >
                  {t('tokenTransfer.transfer')}
                </Typography>
              </>
            )}
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
                  <Typography variant="h1">{`${
                    currentUser.role === 'donor'
                      ? t('tokenTransfer.redeem')
                      : t('tokenTransfer.send')
                  } Life Token`}</Typography>
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
                  {success && transferResult && (
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
                      {t('miscellaneous.done')}
                      <Link
                        href={`${eosConfig}transaction/${transferResult.transaction_id}`}
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
                            height: 300,
                            width: '100%',
                            backgroundColor: 'grey',
                            marginBottom: 24
                          }}
                          onScan={(value) => {
                            if (!value) return
                            handleSetField('to', value || payload.to)
                            setLoadingQr(!loadingQr)
                          }}
                        />
                      )}
                      {currentUser.role !== 'lifebank' && (
                        <>
                          <Typography variant="h4">{`Tokens to ${
                            currentUser.role === 'donor'
                              ? t('tokenTransfer.redeem')
                              : t('tokenTransfer.send')
                          }:`}</Typography>
                          <Box className={classes.AddInput}>
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() =>
                                handleSetField('quantity', payload.quantity + 1)
                              }
                            >
                              <AddCircleIcon fontSize="inherit" />
                            </IconButton>
                            <TextField
                              id="quantity"
                              variant="outlined"
                              type="number"
                              readOnly
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={payload.quantity || 0}
                              onChange={(event) =>
                                handleSetField(
                                  'quantity',
                                  parseInt(event.target.value)
                                )
                              }
                            />
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() =>
                                handleSetField('quantity', payload.quantity - 1)
                              }
                            >
                              <RemoveCircleIcon fontSize="inherit" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                      <Typography variant="h4">
                        {t('miscellaneous.sendTo')}:
                      </Typography>

                      <TextField
                        id="to"
                        label={t('common.account')}
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
                              <CameraAltIcon
                                onClick={() => setLoadingQr(!loadingQr)}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        id="memo"
                        label={t('tokenTransfer.memo')}
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
                        {currentUser.role === 'donor'
                          ? t('tokenTrasfer.redeem')
                          : t('tokenTransfer.send')}
                      </Button>
                      {loading && <CircularProgress />}
                    </Box>
                    <Box className={classes.cancelBtn}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleOpen}
                      >
                        {t('common.cancel')}
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Paper>
            </Fade>
          </Modal>
        </>
      )}
    </>
  )
}

TokenTransfer.propTypes = {
  overrideBoxClass: PropTypes.any,
  overrideLabelClass: PropTypes.any,
  useButton: PropTypes.bool
}

TokenTransfer.defaultProps = {
  useButton: false
}

export default TokenTransfer
