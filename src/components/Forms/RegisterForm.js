import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { EmailInput } from './FormComponents/EmailInput'
import { SubmitLinkPair } from './FormComponents/SubmitLinkPair'
import { TextInput } from './FormComponents/TextInput'
import { PasswordInput } from './FormComponents/PasswordInput'

export const RegisterForm = ({ onSubmit }) => (
  <Form onSubmit={(e) => onSubmit(e)}>
    <TextInput text='Name' />
    <EmailInput />
    <PasswordInput />
    <PasswordInput id='password2'/>
    <SubmitLinkPair url='/login' linkText='Log in' submitText='Register'/>
  </Form>
)

RegisterForm.propTypes = {
  onSubmit: PropTypes.func
}
