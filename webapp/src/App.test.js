import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<ThemeProvider theme={theme} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
