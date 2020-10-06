import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'

const SocialMediaTextField = ({
  idText,
  name,
  label,
  placeholder,
  icon,
  textFieldClass,
  onChangeSocialMediaTextField
}) => (
  <TextField
    id={idText}
    label={label}
    variant="outlined"
    placeholder={placeholder}
    fullWidth
    onChange={(e) => onChangeSocialMediaTextField(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <IconButton color="secondary" aria-label={`${name}`}>
            <Icon>
              <img src={icon} alt={`${name} icon`} height={25} width={25} />
            </Icon>
          </IconButton>
        </InputAdornment>
      )
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
  onChangeSocialMediaTextField: PropTypes.func
}

export default SocialMediaTextField
