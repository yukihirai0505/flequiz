import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getExamCategories} from "../../../redux/modules/ExamCategory"
import PropTypes from 'prop-types'

class RecordTable extends Component {

  static propTypes = {
    recordClick: PropTypes.any
  }

  constructor() {
    super()
  }

  componentWillMount() {
    this.props.getExamCategories()
  }

  render() {
    const {examCategories, recordClick} = this.props
    const list = examCategories && examCategories.map((examCategory, cKey) => {
        return <tr key={cKey} onClick={recordClick.bind(this, examCategory)}>
          <td>{examCategory.id}</td>
          <td>{examCategory.name}</td>
        </tr>
      })

    return (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"/> カテゴリー一覧
        </div>
        <div className="card-block">
          <table className="table table-hover table-outline">
            <thead>
            <tr>
              <th>ID</th>
              <th>カテゴリ名</th>
            </tr>
            </thead>
            <tbody>
            {list}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    examCategories: state.examCategory.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {getExamCategories}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTable)
