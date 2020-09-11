import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import '@brainhubeu/react-carousel/lib/style.css'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import CarouselComponent from '../../components/Carousel'

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '60vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw'
    },
    padding: theme.spacing(5, 2),
    marginTop: theme.spacing(10)
  },
  radioGroup: {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  limitationHandlingPaper: {
    width: '90%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    margin: 'auto',
    border: `0.5px dashed ${theme.palette.secondary.light}`
  },
  addButtonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  }
}))

const LimitationHandling = ({
  classes,
  setQuantity,
  setStartDate,
  setEndDate
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState(new Date())

  return (
    <Paper className={classes.limitationHandlingPaper}>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        Limitation Handling
      </Typography>
      <TextField
        id="secret"
        label="Quantity"
        type="number"
        fullWidth
        placeholder="Available service quantity"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="normal"
            id="start-date-picker-dialog"
            label="Select start offer date"
            format="MM/dd/yyyy"
            value={selectedStartDate}
            onChange={(date) => {
              setStartDate(date)
              setSelectedStartDate(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'Start date'
            }}
          />
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="normal"
            id="end-date-picker-dialog"
            label="Select end offer date"
            format="MM/dd/yyyy"
            value={selectedEndDate}
            onChange={(date) => {
              setEndDate(date)
              setSelectedEndDate(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'End date'
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Paper>
  )
}

const GenericOfferFormComponent = ({
  open,
  setOpen,
  offer,
  setOffer,
  mutation,
  submit
}) => {
  const classes = useStyles()
  const [disableUrlInput, setDisableUrlInput] = useState(true)
}

GenericOfferFormComponent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  offer: PropTypes.object,
  setOffer: PropTypes.func,
  mutation: PropTypes.func,
  submit: PropTypes.func
}

export default GenericOfferFormComponent
