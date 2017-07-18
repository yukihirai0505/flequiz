import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap'
import {toggleDropDownOpen} from "../../../redux/modules/Header"
import {NavLink} from 'react-router-dom'

class Header extends Component {

  constructor() {
    super()
  }

  toggle(status) {
    const {toggleDropDownOpen} = this.props
    toggleDropDownOpen(!status)
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
    const {dropDownOpenStatus, me} = this.props
    let username = me ? me.username: ""
    let profilePicUrl = me.profilePicUrl ? me.profilePicUrl : 'img/noimg.jpg'
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand" href="#"/>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          {/*
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Dashboard</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Users</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Settings</a>
          </li>*/}
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={dropDownOpenStatus} toggle={this.toggle.bind(this, dropDownOpenStatus)}>
              <button onClick={this.toggle.bind(this, dropDownOpenStatus)} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={dropDownOpenStatus}>
                <img src={profilePicUrl} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none">{username}</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem>
                  <NavLink to={'/signOut'} className="nav-link" activeClassName="active">
                    <i className="fa fa-lock"/> ログアウト
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item d-md-down-none"/>
        </ul>
      </header>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    me: state.auth.me,
    dropDownOpenStatus: state.header.dropDownOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {toggleDropDownOpen}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

