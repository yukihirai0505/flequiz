import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import RecordTable from '../../organisms/examCategory/RecordTable'
import {setEditExamCategory} from "../../../redux/modules/ExamCategory"

class ExamCategory extends Component {

  constructor() {
    super()
  }

  buttonAction() {
    this.props.history.push('/admin/exam_category/create')
  }

  recordClickAction(examCategory) {
    this.props.setEditExamCategory(examCategory)
    this.props.history.push(`/admin/exam_category/${examCategory.id}`)
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
  return bindActionCreators(Object.assign({}, {setEditExamCategory}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamCategory)
