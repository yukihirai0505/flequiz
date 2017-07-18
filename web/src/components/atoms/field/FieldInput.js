import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {createFieldErrors} from '../../../utils/CreateFieldErrors'
import Alert from '../../atoms/form/Alert'

export default class FieldInput extends Component {

  static propTypes = {
    input: PropTypes.object,
    classes: PropTypes.any,
    inputClasses: PropTypes.any,
    children: PropTypes.any,
    type: PropTypes.string,
    disabled: PropTypes.any,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    errors: PropTypes.any,
    meta: PropTypes.object,
    labelText: PropTypes.string,
    autoComplete: PropTypes.string
  }

  render() {
    const {input, type, placeholder, style, classes, inputClasses, disabled, errors, meta: {error, touched}, labelText, autoComplete} = this.props

    const fieldErrors = createFieldErrors(errors, error, input.name, touched)

    return (
      <div
        className={classNames(
          fieldErrors && fieldErrors.length > 0 ? "form-group has-danger" : "form-group",
          classes)}
        style={style}
      >
        {labelText && <label>{labelText}</label>}
        {fieldErrors && fieldErrors.length > 0 &&
        <Alert
          error={fieldErrors && fieldErrors.length > 0 && true}
          classNames={classNames("text-danger")}
          inlineStyles={{marginLeft: "5px"}}
        >{fieldErrors}
        </Alert>
        }
        <input
          type={type}
          placeholder={placeholder}
          {...input} disabled={disabled && true}
          autoComplete={autoComplete}
          className={`form-control ${inputClasses}`}
        />
      </div>
    )
  }
}