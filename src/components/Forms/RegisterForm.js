import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { EmailInput, PasswordInput, SubmitLinkPair, TextForm } from './FormComponents'

export const RegisterForm = ({ onSubmit }) => (
  <Form onSubmit={(e) => onSubmit(e)}>
    <TextForm text='Name' />
    <EmailInput />
    <PasswordInput />
    <PasswordInput id='password2'/>
    <SubmitLinkPair url='/login' linkText='Log in' submitText='Register'/>
  </Form>
)

RegisterForm.propTypes = {
  onSubmit: PropTypes.func
}
