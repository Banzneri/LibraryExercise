import React from 'react'
import { Form } from 'react-bootstrap'

export const TextFormItem = (id, labelText, message = null, defaultValue = '') => (
  <Form.Group className="mb-3" controlId={id}>
    <Form.Label>{labelText}</Form.Label>
    <Form.Control type="text" defaultValue={defaultValue} />
    <Form.Text className="text-muted">
      {message}
    </Form.Text>
  </Form.Group>
)
