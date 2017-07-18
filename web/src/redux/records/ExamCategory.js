import {Record} from 'immutable'

const ExamCategoryRecord = Record({list: [], isShowCompleteModal: false, editExamCategory: {}})

export default class ExamCategory extends ExamCategoryRecord {

  setCategories(data) {
    return this.set('list', data)
  }

  showModal(data) {
    return this.set('isShowCompleteModal', data)
  }

  setEditExamCategory(data) {
    return this.set('editExamCategory', data)
  }

}