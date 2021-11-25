import React from 'react'
import { Form } from 'react-bootstrap'

export const EmailInput = () => (
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" required />
    <Form.Text className="text-muted">
        We&apos;ll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
)
