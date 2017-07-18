import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Sidebar extends Component {

  render() {
    const {me} = this.props
    let isAdmin = me ? me.isAdmin : false

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/ranking'} className="nav-link">
                <i className="icon-speedometer"/> ランキング
              </NavLink>
            </li>
            <li className="nav-title">
              メニュー
            </li>
            <li className="nav-item">
              <NavLink to={'/exam'} className="nav-link">
                <i className="icon-heart"/> テスト一覧
              </NavLink>
            </li>
            {isAdmin &&
            <li className="nav-title">
              管理者メニュー
            </li>
            }
            {isAdmin &&
            <li className="nav-item">
              <NavLink to={'/admin/exam_category'} className="nav-link"><i
                className="icon-list"/>
                カテゴリー作成・編集</NavLink>
            </li>
            }
            {isAdmin &&
            <li className="nav-item">
              <NavLink to={'/admin/exam'} className="nav-link"><i className="icon-folder"/>
                テスト作成・編集</NavLink>
            </li>
            }
            {isAdmin &&
            <li className="nav-item">
              <NavLink to={'/admin/user'} className="nav-link"><i className="icon-people"/>
                ユーザー管理</NavLink>
            </li>
            }
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.auth.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

