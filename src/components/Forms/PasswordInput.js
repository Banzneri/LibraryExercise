import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const PasswordInput = ({ id = 'password' }) => (
  <Form.Group className="mb-3" controlId={id}>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" required />
    <Form.Text className="text-muted">
      Your password is well secured
    </Form.Text>
  </Form.Group>
)

PasswordInput.propTypes = {
  id: PropTypes.string
}
