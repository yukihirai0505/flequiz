import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import FieldInput from "../../../components/atoms/field/FieldInput";
import FieldSelect from "../../../components/atoms/field/FieldSelect";
import FieldTextArea from "../../../components/atoms/field/FieldTextArea";
import {createExam, setQuestions, showModal} from "../../../redux/modules/Exam";
import {getExamCategories} from "../../../redux/modules/ExamCategory";
import * as validate from "../../../utils/Validate";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {getTodayStr} from "../../../utils/DateUtil";

class Create extends Component {


  componentWillMount() {
    this.props.setQuestions([{answers: [{}]}])
    this.props.getExamCategories()
  }

  componentWillUnmount() {
    this.props.setQuestions([{answers: [{}]}])
    this.props.showModal(false)
  }

  buttonAction() {
    this.props.history.push('/admin/exam')
  }

  addQuestionAnswerAction(i) {
    const {questions, setQuestions} = this.props
    let newQuestions = [
      ...questions.slice(0, i),
      {answers: questions[i].answers.concat({})},
      ...questions.slice(i + 1)
    ]
    setQuestions(newQuestions)
  }

  addQuestionAction() {
    const {questions, setQuestions} = this.props
    let newQuestions = questions ? questions.concat({answers: [{}]}) : [{answers: [{}]}]
    setQuestions(newQuestions)
  }

  removeQuestionAction(index, maxLength) {
    const {questions, setQuestions, change, formProps} = this.props
    let newQuestions = [
      ...questions.slice(0, index),
      ...questions.slice(index + 1)
    ]
    let formQuestions = formProps && formProps.values ? formProps.values.questions : {}
    for (let i = index; i < maxLength; i++) {
      if (i !== index) {
        change(`questions[${i - 1}]`, formQuestions[i])
      }
      change(`questions[${i}]`, null)
    }
    setQuestions(newQuestions)
  }

  removeQuestionAnswerAction(questionIndex, answerIndex, maxLength) {
    const {questions, setQuestions, change, formProps} = this.props
    let newQuestions = [
      ...questions.slice(0, questionIndex),
      {
        question: questions[questionIndex].question,
        answers: [
          ...questions[questionIndex].answers.slice(0, answerIndex),
          ...questions[questionIndex].answers.slice(answerIndex + 1)
        ]
      },
      ...questions.slice(questionIndex + 1)
    ]
    let formQuestions = formProps && formProps.values ? formProps.values.questions : []
    let formAnswers = formQuestions[questionIndex] && formQuestions[questionIndex].answers ? formQuestions[questionIndex].answers : []
    for (let i = answerIndex; i < maxLength; i++) {
      if (i !== answerIndex) {
        change(`questions[${questionIndex}].answers[${i - 1}]`, formAnswers[i])
      }
      change(`questions[${questionIndex}].answers[${i}].content`, null)
    }
    setQuestions(newQuestions)
  }

  handleSubmit(data) {
    const {me, createExam} = this.props
    data.exam.updateUsername = me ? me.username : ""
    data.exam.updateDate = getTodayStr()
    data.questions = data.questions.filter(q => {
      if (q && q.answers && q.answers.filter(a => a.content) && q.question && q.question.content) {
        return q.answers = q.answers.filter(a => a.content)
      }
    })
    createExam(data)
  }

  render() {
    const {handleSubmit, examCategories, questions, isShow} = this.props

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">新規作成</div>

              <form
                className="form-horizontal"
                onSubmit={this.handleSubmit}
              >
                <div className="card-block">
                  <Field
                    id="examCategoryId"
                    component={FieldSelect}
                    name="exam.examCategoryId"
                    labelText="カテゴリー"
                    placeholder="カテゴリーを選択してください。"
                    values={examCategories.map(e => ({"value": e.id, "label": e.name}))}
                    errors={{}}
                    validate={[validate.required()]}
                  />
                  <Field
                    id="name"
                    component={FieldInput}
                    name="exam.name"
                    type="text"
                    labelText="テスト名"
                    placeholder="テスト名を入力してください。"
                    errors={{}}
                    validate={[validate.required()]}
                  />
                  <Field
                    id="limitTime"
                    component={FieldInput}
                    name="exam.limitTime"
                    type="number"
                    labelText="制限時間(分)"
                    placeholder="制限時間を入力してください。"
                    errors={{}}
                    validate={[validate.required()]}
                  />
                  {questions.map((question, qKey) => {
                    return (
                      <div className="row">
                        <div className="col-md-8">
                          <Field
                            key={qKey}
                            id={`questions[${qKey}]`}
                            component={FieldTextArea}
                            name={`questions[${qKey}].question.content`}
                            type="text"
                            labelText={`問題(${qKey + 1})`}
                            placeholder={`問題(${qKey + 1})を入力してください。`}
                            errors={{}}
                            validate={[validate.required()]}
                          />
                        </div>
                        <div>
                          <div className="col-md-4">
                            <button
                              type="button"
                              onClick={this.removeQuestionAction.bind(this, qKey, questions.length)}
                              style={{margin: "28px 10px 0 0"}}
                              className={'btn btn-secondary'}><i className="fa fa-minus"/> 問題削除
                            </button>
                          </div>
                          <div className="col-md-4">
                            <button
                              type="button"
                              onClick={this.addQuestionAnswerAction.bind(this, qKey)}
                              style={{margin: "28px 10px 0 0"}}
                              className={'btn btn-info'}>
                              <i className="fa fa-plus"/>
                              設問追加
                            </button>
                          </div>
                        </div>
                        {question && question.answers && question.answers.map((answer, aKey) => {
                          return (
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-8">
                                  <Field
                                    key={aKey}
                                    id={`questions[${qKey}].answers[${aKey}]`}
                                    component={FieldInput}
                                    name={`questions[${qKey}].answers[${aKey}].content`}
                                    type="text"
                                    labelText={`設問(${aKey + 1})${aKey === 0 ? " 設問(1)が正解になります。" : ""}`}
                                    placeholder={`設問(${aKey + 1})を入力してください。`}
                                    classes={aKey === 0 ? "has-success" : ""}
                                    inputClasses={aKey === 0 ? "form-control-success" : ""}
                                    style={{marginLeft: "30px"}}
                                    errors={{}}
                                    validate={[validate.required()]}
                                  />
                                </div>
                                {aKey !== 0 &&
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    onClick={this.removeQuestionAnswerAction.bind(this, qKey, aKey, question.answers.length)}
                                    style={{margin: "28px 10px 0 0"}}
                                    className={'btn btn-secondary'}>
                                    <i className="fa fa-minus"/>
                                    設問削除
                                  </button>
                                </div>
                                }
                              </div>
                            </div>)
                        })}
                      </div>
                    )
                  })}
                  <button
                    type="button"
                    onClick={this.addQuestionAction.bind(this)}
                    style={{marginBottom: 16}}
                    className={'btn btn-success'}><i className="fa fa-plus"/> 問題追加
                  </button>
                </div>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleSubmit(this.handleSubmit.bind(this))}
                  >
                    <i className="fa fa-dot-circle-o"/> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal isOpen={isShow} className="modal-success">
          <ModalHeader>作成完了</ModalHeader>
          <ModalBody>
            テスト作成完了致しました。
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.buttonAction.bind(this)}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    examCategories: state.examCategory.list,
    formProps: state.form.createExamForm,
    questions: state.exam.questions,
    isShow: state.exam.isShowCompleteModal,
    me: state.auth.me
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {
    createExam, getExamCategories, setQuestions, showModal
  }), dispatch)
}

let CreateExamForm = reduxForm({
  form: 'createExamForm',
  enableReinitialize: true
})(Create)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateExamForm))