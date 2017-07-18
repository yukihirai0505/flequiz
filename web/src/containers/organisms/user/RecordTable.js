import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getUsers, deleteUserById} from "../../../redux/modules/User"
import PropTypes from 'prop-types'

class RecordTable extends Component {

  static propTypes = {
    recordClick: PropTypes.any
  }

  constructor() {
    super()
  }

  componentWillMount() {
    this.props.getUsers()
  }

  render() {
    const {users, recordClick} = this.props
    const list = users && users.map((user, cKey) => {
        let profilePicUrl = user.profilePicUrl ? user.profilePicUrl : '/img/noimg.jpg'
        return <tr key={cKey} onClick={recordClick.bind(this, user)}>
          <td className="text-center">{user.id}</td>
          <td className="text-center">
            <div className="avatar">
              <img src={profilePicUrl} className="img-avatar" alt={user.email}/>
            </div>
          </td>
          <td>{user.username}</td>
        </tr>
      })

    return (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"/> ユーザー一覧
        </div>
        <div className="card-block">
          <table className="table table-hover table-outline">
            <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center"><i className="icon-people"/></th>
              <th>ユーザー名</th>
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
    users: state.user.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {getUsers, deleteUserById}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTable)
