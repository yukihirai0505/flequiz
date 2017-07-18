import React, {Component} from 'react'

const TextBox = props => {
  return (
    <div className={props.hasError ? "form-group has-danger" : "form-group"}>
      <label htmlFor={props.name}>{props.labelName}</label>
      <input type="text"
             className="form-control"
             id={props.name}
             name={props.name}
             placeholder={props.placeholder}
             onChange={props.onChange}
      />
    </div>
  )
}

export {TextBox}

