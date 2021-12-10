import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { EmailInput } from './FormComponents/EmailInput'
import { SubmitLinkPair } from './FormComponents/SubmitLinkPair'
import { PasswordInput } from './FormComponents/PasswordInput'

export const LoginForm = ({ onSubmit }) => (
  <Form onSubmit={(e) => onSubmit(e)}>
    <EmailInput />
    <PasswordInput />
    <SubmitLinkPair url='/' linkText='Register' submitText='Log in' />
  </Form>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func
}
