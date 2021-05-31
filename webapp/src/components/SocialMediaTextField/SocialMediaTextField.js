import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'

const SocialMediaTextField = ({
  idText,
  name,
  label,
  placeholder,
  icon,
  textFieldClass,
  defaultValue,
  onChangeSocialMediaTextField
}) => (
  <TextField
    id={idText}
    variant="filled"
    value={defaultValue}
    fullWidth
    placeholder={placeholder}
    onChange={(e) => onChangeSocialMediaTextField(e.target.value)}
    InputProps={{
      startAdornment:(
        <InputAdornment position="start">
          {icon}
        </InputAdornment>
      ),
      endAdornment: (
        <InputLabel >
          {label}
        </InputLabel>
      ),
    }}
    InputLabelProps={{
      shrink: true
    }}
    className={textFieldClass}
  />
)

SocialMediaTextField.propTypes = {
  idText: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  textFieldClass: PropTypes.string,
  defaultValue: PropTypes.string,
  onChangeSocialMediaTextField: PropTypes.func
}

export default SocialMediaTextField
