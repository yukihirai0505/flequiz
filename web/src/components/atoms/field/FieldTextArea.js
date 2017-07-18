import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {createFieldErrors} from '../../../utils/CreateFieldErrors'
import Alert from '../../atoms/form/Alert'

export default class FieldTextArea extends Component {

  static propTypes = {
    input: PropTypes.object,
    classes: PropTypes.any,
    children: PropTypes.any,
    placeholder: PropTypes.string,
    errors: PropTypes.any,
    meta: PropTypes.object,
    labelText: PropTypes.string,
  }

  render() {
    const {input, placeholder, classes, errors, meta: {error, touched}, labelText} = this.props

    const fieldErrors = createFieldErrors(errors, error, input.name, touched)

    return (
      <div
        className={classNames(
          fieldErrors && fieldErrors.length > 0 ? "form-group has-danger" : "form-group",
          classes)}
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
        <textarea {...input}
                  rows="9"
                  className="form-control"
                  placeholder={placeholder}
        />
      </div>
    )
  }
}