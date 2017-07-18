import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import RecordTable from '../../organisms/exam/RecordTable'

class Exam extends Component {

  constructor() {
    super()
  }

  buttonAction() {
    this.props.history.push('/admin/exam/create')
  }

  recordClickAction(exam) {
    this.props.history.push(`/admin/exam/${exam.id}`)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              onClick={this.buttonAction.bind(this)}
              style={{marginBottom: 16}}
              className={'btn btn-success'}><i className="fa fa-plus"/> 新規作成
            </button>
            <RecordTable recordClick={this.recordClickAction.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
