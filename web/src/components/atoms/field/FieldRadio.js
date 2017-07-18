import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {createFieldErrors} from '../../../utils/CreateFieldErrors'
import Alert from '../../atoms/form/Alert'

export default class FieldRadio extends Component {

  static propTypes = {
    input: PropTypes.object,
    children: PropTypes.object,
    errors: PropTypes.object,
    meta: PropTypes.object,
    onChange: PropTypes.func
  }

  render() {
    const {input, meta: {touched, error}, data, checkedValue, errors} = this.props

    const fieldErrors = createFieldErrors(errors, error, input.name, touched)

    const Items = data.map(choice => {
      const {id, content} = choice
      return (
          <div className="radio" key={`${input.name}-${id}`}>
            <label htmlFor={input.name}>
              {
                String(checkedValue) === String(id)
                ? <input {...input} type="radio" id={input.name} name={input.name} value={id} checked />
                : <input {...input} type="radio" id={input.name} name={input.name} value={id} />

              } {content}
            </label>
          </div>
      )
    })
    return (
      <div
        className={classNames(
          fieldErrors && fieldErrors.length > 0 ? "form-group has-danger" : "form-group"
        )}
      >
        <div className="c-form__alert-box">
          {fieldErrors && fieldErrors.length > 0 &&
          <Alert
            error={fieldErrors && fieldErrors.length > 0 && true}
            classNames={classNames("text-danger")}
            inlineStyles={{marginLeft: "5px"}}
          >{fieldErrors}
          </Alert>
          }
          {Items}
        </div>
      </div>
    )
  }
}