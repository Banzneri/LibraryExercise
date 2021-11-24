import React from 'react'
import PropTypes from 'prop-types'

export const Errors = ({ errorMessages }) => (
  <div>
    {errorMessages &&
      <span className='error-message'>
        <p>{errorMessages}</p>
      </span>}
  </div>
)

Errors.propTypes = {
  errorMessages: PropTypes.string
}
