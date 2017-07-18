import {Record} from 'immutable'

const UserRecord = Record({list: [{}], isShowDeleteModal: false, modalMessage: "", selectedUser: {}, isDeleted: false})

export default class User extends UserRecord {

  setUsers(data) {
    return this.set('list', data).set('isDeleted', false)
  }

  setDeleted() {
    return this.set('isDeleted', true)
  }

  setUser(data) {
    return this.set('selectedUser', data)
  }

  setShowDeleteModal(data) {
    return this.set('isShowDeleteModal', data)
  }

  setModalMessage(data) {
    return this.set('modalMessage', data)
  }

}
