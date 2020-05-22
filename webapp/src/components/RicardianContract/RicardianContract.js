import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const RicardianContract = ({ abi, action }) => {
  const [source, setSource] = useState('')
  const addIcon = (text = '') => {
    const chunks = `${text}`.split('icon:')
    const icon = chunks[1] ? `\n ![icon](${chunks[1]})` : ''

    return `${chunks[0]} ${icon}`
  }

  useEffect(() => {
    if (!abi?.actions?.length) {
      return
    }

    let actions = abi.actions.filter(
      ({ ricardian_contract: ricardianContract }) => !!ricardianContract
    )

    if (action) {
      actions = abi.actions.filter(({ name }) => name === action)
    }

    if (actions.lenght < 1) {
      return
    }

    actions = actions.map(({ name, ricardian_contract: ricardianContract }) => {
      return addIcon(`# ${name} \n ${ricardianContract}`)
    })

    const clauses = abi.ricardian_clauses.map(({ id, body }) => {
      return addIcon(`# ${id} \n ${body}`)
    })

    setSource(
      [...actions, ...clauses]
        .join('\n')
        .replace(/title:/g, '## ')
        .replace(/summary: /g, '')
    )
  }, [abi, action])

  return <ReactMarkdown source={source} />
}

RicardianContract.propTypes = {
  abi: PropTypes.object,
  action: PropTypes.string
}

export default RicardianContract
