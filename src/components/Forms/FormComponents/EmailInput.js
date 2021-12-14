import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const EmailInput = ({ message = null }) => (
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" required />
    <Form.Text className="text-muted">
        {message}
    </Form.Text>
  </Form.Group>
)

EmailInput.propTypes = {
  message: PropTypes.string
}
