import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import RecordTable from '../../organisms/user/RecordTable'
import {setShowDeleteModal, setModalMessage, getUsers, deleteUserById, setUser} from "../../../redux/modules/User"
import { getMe } from '../../../redux/modules/Auth'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {getCookie} from "../../../utils/CookieUtil";
import {TOKEN_COOKIE_KEY} from "../../../constants/Index";

class User extends Component {

  constructor() {
    super()
  }

  okAction() {
    const {selectedUser} = this.props
    this.props.deleteUserById({id: selectedUser.id})
    this.props.setShowDeleteModal(false)
  }

  cancelAction() {
    this.props.setShowDeleteModal(false)
  }

  recordClickAction(user) {
    this.props.setUser(user)
    this.props.setModalMessage(`${user.username}さんを削除しますか？`)
    this.props.setShowDeleteModal(true)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.isDeleted) {
      this.props.getUsers()
      const {getMe} = this.props
      let token = getCookie(TOKEN_COOKIE_KEY)
      if (token) {
        getMe(token)
      }
    }
  }

  componentWillUnmount() {
    this.props.setUser({})
    this.props.setShowDeleteModal(false)
  }

  render() {
    const {isShow, modalMessage} = this.props
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <RecordTable recordClick={this.recordClickAction.bind(this)}/>
          </div>
        </div>
        <Modal isOpen={isShow} className="modal-success">
          <ModalHeader>編集完了</ModalHeader>
          <ModalBody>
            {modalMessage}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.okAction.bind(this)}>OK</Button>
            <Button color="secondary" onClick={this.cancelAction.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isShow: state.user.isShowDeleteModal,
    modalMessage: state.user.modalMessage,
    selectedUser: state.user.selectedUser,
    isDeleted: state.user.isDeleted
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {setShowDeleteModal, getUsers, deleteUserById, setUser, setModalMessage, getMe}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
