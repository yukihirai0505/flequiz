import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Alert extends Component {
  static propTypes = {
    children: PropTypes.any,
    error: PropTypes.bool,
    inlineStyles: PropTypes.any,
    classNames: PropTypes.any
  }

  render() {
    return (
      <span
        className={this.props.classNames}
        style={this.props.inlineStyles}
      ><i className="fa fa-exclamation-triangle"/> {this.props.children}</span>
    )
  }
}