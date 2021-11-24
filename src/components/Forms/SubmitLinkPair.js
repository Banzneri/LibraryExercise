import { Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const SubmitLinkPair = ({ url, linkText, submitText = 'Submit' }) => {
  return (
    <div>
      <Button type="submit">{submitText}</Button>{' '}
      <Link to={url}>
        <Button variant="secondary">{linkText}</Button>{' '}
      </Link>
    </div>
  )
}

SubmitLinkPair.propTypes = {
  url: PropTypes.string,
  linkText: PropTypes.string,
  submitText: PropTypes.string
}
