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

export const TextInput = ({ text, type = 'text', message = null, defaultValue = '' }) => (
  <Form.Group className="mb-3" controlId="text">
    <Form.Label>{text}</Form.Label>
    <Form.Control type={type} defaultValue={defaultValue} required />
    <Form.Text className="text-muted">
      {message}
    </Form.Text>
  </Form.Group>
)

TextInput.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
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

export const SelectInput = ({ labelText, options, id = 'select', defaultValue = undefined }) => (
  <Form.Group className="mb-3" controlId={id}>
    <Form.Label>Genre</Form.Label>
    <Form.Select aria-label={labelText} defaultValue={defaultValue}>
      {options.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
    </Form.Select>
  </Form.Group>
)

SelectInput.propTypes = {
  labelText: PropTypes.string,
  options: PropTypes.array,
  id: PropTypes.string,
  defaultValue: PropTypes.number
}
