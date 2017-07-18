import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {withRouter} from "react-router"
import _ from "lodash/array"
import FieldRadio from "../../../components/atoms/field/FieldRadio"
import {getExamById} from "../../../redux/modules/Exam"
import {
  showModal, setModalMessage, updateTakeSeconds,
  startTimer, stopTimer, createExamTakeUser,
  clearModal, setFinish
} from "../../../redux/modules/ExamTake"
import {nl2br} from "../../../utils/StringUtil"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Pie} from 'react-chartjs-2';
import {getCookie} from "../../../utils/CookieUtil";
import {TOKEN_COOKIE_KEY} from "../../../constants/Index";

class Create extends Component {

  componentWillMount() {
    const {updateTakeSeconds, startTimer, clearModal, setFinish} = this.props
    clearModal()
    setFinish(false)
    let intervalId = setInterval(() => updateTakeSeconds(), 1000)
    startTimer(intervalId)
    let params = {
      id: this.props.match.params.id,
      isRandom: true
    }
    this.props.getExamById(params)
  }

  buttonAction() {
    this.props.clearModal()
  }

  componentWillUnmount() {
    this.props.clearModal()
    this.props.stopTimer()
    this.props.setFinish(false)
  }

  showResult(data) {
    const {showModal, examEntity, setModalMessage, createExamTakeUser, stopTimer, takeSeconds, setFinish, isFinish} = this.props
    if (!isFinish) {
      setFinish(true)
      stopTimer()
      let correctAnswerIds = examEntity.questions.map(q => q.answers.filter(a => a.isCorrectAnswer)[0].id)
      let answerIds = data.questions ? data.questions.map(q => Number(q.answerId)) : []
      let correctNum = _.intersection(correctAnswerIds, answerIds).length
      let score = Math.floor(correctNum / correctAnswerIds.length * 100)
      let message = `${correctAnswerIds.length}問中${correctNum}問正解 ${score}点`
      let resultData = {
        examId: examEntity.exam.id,
        score: score,
        takeSeconds: takeSeconds,
      }
      let token = getCookie(TOKEN_COOKIE_KEY)
      createExamTakeUser(resultData, token)
      setModalMessage(message)
      showModal(true)
    }
  }

  render() {
    const {handleSubmit, examEntity, formProps, isShow, modalMessage, takeSeconds, isFinish} = this.props
    const {name, limitTime} = examEntity.exam ? (examEntity.exam) : {}
    const questions = examEntity.questions ? (examEntity.questions) : []
    let totalTime = limitTime * 60
    let leftTime = totalTime - takeSeconds
    if (totalTime === takeSeconds) {
      let data = formProps && formProps.values ? formProps.values: {questions: []}
      this.showResult(data)
    }

    let pie = {
      labels: [
        '経過時間',
        '残り時間'
      ],
      datasets: [{
        data: [takeSeconds, leftTime],
        backgroundColor: [
          '#FF6384',
          '#36A2EB'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB'
        ]
      }]
    }

    return (

      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">テスト名: {name} <span style={{float: "right"}}>制限時間: {limitTime}分</span></div>
              <form
                className="form-horizontal"
                onSubmit={this.showResult}
              >
                <div className="card-block">
                  {questions.map((qEntity, qKey) => {
                    const question = qEntity.question
                    const correctAnswer = getCorrectAnswer(qEntity.answers)
                    const correctMessage = isFinish && correctAnswer && correctAnswer.content ? `正解は => ${correctAnswer.content}`: ''
                    return (
                      <div className="row">
                        <div className="col-md-8">
                          <p style={{fontSize: "15px", fontWeight: "bold"}}>{`【問題(${qKey + 1})】`}</p>
                          <p style={{fontWeight: "bold"}}>{nl2br(question.content)}</p>
                        </div>
                        <div className="col-md-8">
                          <p style={{color: "red"}}>{correctMessage}</p>
                          <Field
                            name={`questions[${qKey}].answerId`}
                            component={FieldRadio}
                            checkedValue={formProps && formProps.values && formProps.values.questions[qKey] && formProps.values.questions[qKey].answerId }
                            data={qEntity.answers}
                            errors={{}}
                            validate={[]}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="card-footer">
                  {!isFinish &&
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleSubmit(this.showResult.bind(this))}
                  >
                    <i className="fa fa-dot-circle-o"/> 回答する
                  </button>
                  }
                </div>
              </form>
            </div>
          </div>
          <div style={{ position: "relative", height: "200px" }}>
            <div style={{ position: "absolute", right: 0, bottom: 0 }}>
              <Pie data={pie}/>
            </div>
          </div>
        </div>
        <Modal isOpen={isShow} className="modal-success">
          <ModalHeader>採点結果</ModalHeader>
          <ModalBody>
            <p>
              {modalMessage}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.buttonAction.bind(this)}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const getCorrectAnswer = (obj = []) => {
  let label
  obj.forEach((item) => {
    if (item.isCorrectAnswer) return label = item
  })
  return label ? label : {}
}

function mapStateToProps(state) {
  return {
    examCategories: state.examCategory.list,
    examEntity: state.exam.selectedExam,
    formProps: state.form.createExamTakeForm,
    isShow: state.examTake.isShowCompleteModal,
    modalMessage: state.examTake.modalMessage,
    takeSeconds: state.examTake.takeSeconds,
    isFinish: state.examTake.isFinish
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({},
    { getExamById, showModal, setModalMessage, updateTakeSeconds, startTimer, stopTimer, createExamTakeUser, clearModal, setFinish }),
    dispatch
  )
}

let CreateExamTakeForm = reduxForm({
  form: 'createExamTakeForm',
  enableReinitialize: true
})(Create)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateExamTakeForm))