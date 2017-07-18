import React, {Component} from "react";
import {Progress} from "reactstrap";
import {getRanking, setHiddenCommand} from "../../../redux/modules/Ranking";
import {updateMe} from "../../../redux/modules/Auth";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getCookie} from "../../../utils/CookieUtil";
import {TOKEN_COOKIE_KEY} from "../../../constants/Index";

class Ranking extends Component {

  keyPressHandler = (e) => {
    const {hiddenCommand, setHiddenCommand, me, updateMe} = this.props
    let keyCode = e.keyCode
    let command = hiddenCommand+keyCode
    // 隠しコマンド=>bbq
    if (command.match(/9898113/)) {
      let token = getCookie(TOKEN_COOKIE_KEY)
      if (token) {
        updateMe({isAdmin: !me.isAdmin}, token)
        setHiddenCommand("")
      }
    } else {
      setHiddenCommand(command)
    }
  }

  componentWillMount() {
    const {getRanking} = this.props
    document.addEventListener('keypress', this.keyPressHandler, false)
    getRanking()
  }

  componentWillUnmount() {
    const {setHiddenCommand} = this.props
    document.removeEventListener('keypress', this.keyPressHandler, false)
    setHiddenCommand("")
  }

  render() {
    const {ranking} = this.props
    const list = ranking && ranking.map((user, cKey) => {
        let score = user.score
        let barColor
        if (score <= 25) {
          barColor = "danger"
        } else if (score <= 50) {
          barColor = "warning"
        } else if (score <= 75) {
          barColor = "info"
        } else {
          barColor = "success"
        }
        let profilePicUrl = user.profilePicUrl ? user.profilePicUrl : '/img/noimg.jpg'
        return <tr key={cKey}>
          <td className="text-center">
            {cKey === 0 &&
            <img src={'img/no1.png'} alt="" style={{height: "30px"}}/>
            }
            {cKey !== 0 &&
            <p style={{fontSize: "20px", fontWeight: "bold"}}>{cKey + 1}</p>
            }
          </td>
          <td className="text-center">
            <div className="avatar">
              <img src={profilePicUrl} className="img-avatar" alt="admin@bootstrapmaster.com"/>
            </div>
          </td>
          <td>
            <div>{user.username}</div>
          </td>
          <td>
            <div className="clearfix">
              <div className="float-left">
                <strong>{score}</strong>
              </div>
            </div>
            <Progress className="progress-xs" color={barColor} value={score}/>
          </td>
        </tr>
      })
    return (
      <div className="animated fadeIn">
        <table className="table table-hover table-outline mb-0 hidden-sm-down">
          <thead className="thead-default">
          <tr>
            <th className="text-center">順位</th>
            <th className="text-center"><i className="icon-people"/></th>
            <th>ユーザー</th>
            <th>戦闘力</th>
          </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ranking: state.ranking.list,
    hiddenCommand: state.ranking.hiddenCommand,
    me: state.auth.me
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {getRanking, updateMe, setHiddenCommand}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)
