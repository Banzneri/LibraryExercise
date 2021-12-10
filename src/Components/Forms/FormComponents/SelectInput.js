import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

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
