import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getExams} from "../../../redux/modules/Exam"
import {getExamCategories} from "../../../redux/modules/ExamCategory"
import PropTypes from 'prop-types'

class RecordTable extends Component {

  static propTypes = {
    recordClick: PropTypes.any,
    examTakeUsers: PropTypes.array,
  }

  constructor() {
    super()
  }

  componentWillMount() {
    this.props.getExams()
    this.props.getExamCategories()
  }

  render() {
    const {exams, examCategories, recordClick, examTakeUsers} = this.props
    let isShowScore = examTakeUsers && examTakeUsers.length > 0
    const list = exams && exams.map((exam, cKey) => {
        let takeUser = getTakeUser(examTakeUsers, exam.id)
        let score = takeUser && takeUser.score >= 0 ? `${takeUser.score}点`: "未受験"
        let minute = takeUser && takeUser.takeSeconds >= 60 ? `${takeUser.takeSeconds % 3600 / 60 | 0}分`: ""
        let seconds = takeUser && takeUser.takeSeconds ? `${takeUser.takeSeconds % 60}杪`: ""
        let takeSeconds = minute && seconds ? `(${minute}${seconds})`: seconds ? `(${seconds})`: ""
        return <tr key={cKey} onClick={recordClick.bind(this, exam)}>
          <td>{exam.id}</td>
          <td>{getCategoryName(examCategories, exam.examCategoryId)}</td>
          <td>{exam.name}</td>
          <td>{exam.limitTime}分</td>
          <td>{exam.updateUsername}</td>
          <td>{exam.updateDate}</td>
          {isShowScore &&
          <td>{`${score}${takeSeconds}`}</td>
          }
        </tr>
      })

    return (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"/> テスト一覧
        </div>
        <div className="card-block">
          <table className="table table-hover table-outline">
            <thead>
            <tr>
              <th>ID</th>
              <th>カテゴリ名</th>
              <th>テスト名</th>
              <th>制限時間</th>
              <th>最終更新者</th>
              <th>最終更新日</th>
              {isShowScore &&
              <th>前回スコア</th>
              }
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

const getCategoryName = (obj, id) => {
  let label
  obj.forEach((item) => {
    if (item.id === id) return label = item.name
  })
  return label
}

const getTakeUser = (obj = [], id) => {
  let label
  obj.forEach((item) => {
    if (item.examId === id) return label = item
  })
  return label ? label : {}
}

const mapStateToProps = (state) => {
  return {
    exams: state.exam.list,
    examCategories: state.examCategory.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {getExams, getExamCategories}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTable)
