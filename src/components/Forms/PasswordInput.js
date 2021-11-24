import React from 'react'
import { Form } from 'react-bootstrap'

export const PasswordInput = () => (
  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" />
    <Form.Text className="text-muted">
      Your password is well secured
    </Form.Text>
  </Form.Group>
)
