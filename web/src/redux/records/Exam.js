import {Record} from 'immutable'

const ExamRecord = Record({list: [{}], selectedExam: {}, questions: [{answers: [{}]}], isShowCompleteModal: false, editStarted: false})

export default class Exam extends ExamRecord {

  setExams(data) {
    return this.set('list', data)
  }

  setExam(data) {
    return this.set('selectedExam', data)
  }

  setQuestions(data) {
    return this.set('questions', data)
  }

  showModal(data) {
    return this.set('isShowCompleteModal', data)
  }

  setEditStarted(data) {
    return this.set('editStarted', data)
  }
}
