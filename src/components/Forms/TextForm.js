import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const TextForm = ({ text, message = null, defaultValue = '' }) => (
  <Form.Group className="mb-3" controlId="text">
    <Form.Label>{text}</Form.Label>
    <Form.Control type="text" defaultValue={defaultValue} required />
    <Form.Text className="text-muted">
      {message}
    </Form.Text>
  </Form.Group>
)

TextForm.propTypes = {
  text: PropTypes.string,
  message: PropTypes.string,
  defaultValue: PropTypes.string
}
