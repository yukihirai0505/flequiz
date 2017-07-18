import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import RecordTable from '../../organisms/exam/RecordTable'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {showModal, setExam, setModalMessage, clearModal} from "../../../redux/modules/ExamTake"
import {getExamTakeUsersByUser} from "../../../redux/modules/ExamTake"
import {getCookie} from "../../../utils/CookieUtil";
import {TOKEN_COOKIE_KEY} from "../../../constants/Index";

class ExamTake extends Component {

  constructor() {
    super()
  }

  componentWillMount() {
    const {getExamTakeUsersByUser, clearModal} = this.props
    clearModal()
    let token = getCookie(TOKEN_COOKIE_KEY)
    getExamTakeUsersByUser(token)
  }

  toggleAction() {
    const {isShow, showModal} = this.props
    showModal(!isShow)
  }

  recordClickAction(exam) {
    const {setExam, setModalMessage, showModal} = this.props
    const modalMessage = (
      <div>
        <p>{`テスト名: ${exam.name}`}</p>
        <p>{`制限時間: ${exam.limitTime}`}分</p>
      </div>
    )
    setExam(exam)
    setModalMessage(modalMessage)
    showModal(true)
  }

  moveToTheExam() {
    const {exam} = this.props
    this.props.history.push(`/exam/${exam.id}`)
  }

  render() {
    const {isShow, modalMessage, takeUsers} = this.props
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <RecordTable recordClick={this.recordClickAction.bind(this)} examTakeUsers={takeUsers} />
          </div>
        </div>

        <Modal isOpen={isShow} toggle={this.toggleAction.bind(this)} className="modal-success">
          <ModalHeader toggle={this.toggleAction.bind(this)}>テスト</ModalHeader>
          <ModalBody>
            {modalMessage}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.moveToTheExam.bind(this)}>受験する</Button>{' '}
            <Button color="secondary" onClick={this.toggleAction.bind(this)}>今回は見送る</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exam: state.examTake.exam,
    modalMessage: state.examTake.modalMessage,
    isShow: state.examTake.isShowCompleteModal,
    takeUsers: state.examTake.examTakeUsers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {showModal, setExam, setModalMessage, getExamTakeUsersByUser, clearModal}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamTake)
