import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import Alert from '@material-ui/lab/Alert'
import { useTranslation } from 'react-i18next'
import Snackbar from '@material-ui/core/Snackbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'

import styles from './styles'

const styleH1 = {
  fontSize: '15px',
  textAlign: 'center',
  color: 'red'
};
 
const invisibleStyle = {
  display: 'none',
};

const TransactionReport = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const [messegaAlert, setMessegaAlert] = useState("false")
  const [severity] = useState("error")
  const properties = { header: 'Acme' }
  const head = [["ID", "Name", "Country"]]
  const body = [
      [1, "Shaw", "Tanzania"],
      [2, "Nelson", "Kazakhstan"],
      [3, "Garcia", "Madagascar"],
  ]

  const handleOpenAlert = () => setOpenAlert(!openAlert)


  return (
    <>
      <PDF
        filename="Report"
        properties={properties}
        preview={true}
        previewWidth="100%"
      >
        <Text x={35} y={25} size={40}>Report</Text>
        <Table
          head={head}
          body={body}
        />
      </PDF>
      <div id="page" style={invisibleStyle}>
        <h1 style={styleH1}>Source Html</h1>
          <p>
            <strong>lorem ipsumLorem </strong>Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised
            in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
      </div>
      
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleOpenAlert}>
        <Alert onClose={handleOpenAlert} severity={severity}>
          {messegaAlert}
        </Alert>
      </Snackbar>
    </>
  )
}

export default TransactionReport