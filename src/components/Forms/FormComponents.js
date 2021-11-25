import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

export const EmailInput = () => (
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" required />
    <Form.Text className="text-muted">
        We&apos;ll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
)
