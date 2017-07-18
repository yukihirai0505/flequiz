import {Record} from 'immutable'

const ExamTakeRecord = Record(
  {
    exam: {},
    examTakeUsers: [],
    modalMessage: "",
    isShowCompleteModal: false,
    takeSeconds: 0,
    intervalId: "",
    isFinish: false
  }
)

export default class ExamTake extends ExamTakeRecord {

  setExam(data) {
    return this.set('exam', data)
  }

  setExamTakeUsers(data) {
    return this.set('examTakeUsers', data)
  }

  setModalMessage(data) {
    return this.set('modalMessage', data)
  }

  showModal(data) {
    return this.set('isShowCompleteModal', data)
  }

  clearModal(data) {
    return this.set('isShowCompleteModal', false).set('modalMessage', '')
  }

  updateTakeSeconds() {
    let takeTime = this.get('takeSeconds')
    return this.set('takeSeconds', takeTime+1)
  }

  startTimer(data) {
    let intervalId = this.get('intervalId')
    clearInterval(intervalId)
    return this.set('takeSeconds', 0).set('intervalId', data)
  }

  stopTimer(data) {
    let intervalId = this.get('intervalId')
    clearInterval(intervalId)
    return this.set('takeSeconds', 0).set('intervalId', "")
  }

  setFinish(data) {
    return this.set('isFinish', data)
  }

}