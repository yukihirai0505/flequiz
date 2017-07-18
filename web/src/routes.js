import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"

import App from "./containers/App"
import ExamTake from "./containers/pages/examTake/Index"
import CreateExamTake from "./containers/pages/examTake/Create"
import Exam from "./containers/pages/exam/Index"
import CreateExam from "./containers/pages/exam/Create"
import EditExam from "./containers/pages/exam/Edit"
import ExamCategory from "./containers/pages/examCategory/Index"
import CreateExamCategory from "./containers/pages/examCategory/Create"
import EditExamCategory from "./containers/pages/examCategory/Edit"
import Ranking from "./containers/pages/ranking/Index"
import Callback from "./containers/pages/callback/Index"
import SingOut from "./containers/pages/signOut/Index"
import Authenticate from "./containers/organisms/auth/Authenticate"
import AdminCheck from "./containers/organisms/auth/AdminCheck"
import User from "./containers/pages/user/Index"

export function getPathName(pathName) {
  const paths = [
    {path: '/', name: 'ホーム'},
    {path: '/callback', name: '認証'},
    {path: '/signOut', name: 'ログアウト'},
    {path: '/ranking', name: 'ランキング'},
    {path: '/exam', name: 'テスト一覧'},
    {path: '/exam/:id', name: 'テスト受験'},
    {path: '/exam/complete', name: 'テスト終了'},
    {path: '/admin', name: '管理者ページ'},
    {path: '/admin/exam_category', name: 'カテゴリー'},
    {path: '/admin/exam_category/create', name: 'カテゴリー作成'},
    {path: '/admin/exam_category/:id', name: 'カテゴリー編集'},
    {path: '/admin/exam', name: 'テスト'},
    {path: '/admin/exam/create', name: 'テスト作成'},
    {path: '/admin/exam/:id', name: 'テスト編集'},
    {path: '/admin/user', name: 'ユーザー一覧'},
  ]
  return paths.map((p) => {
    if (p.path === pathName) {
      return p.name
    }
  })
}

export default (
  <App>
    <Switch>
      <Route exact path="/callback" component={Callback}/>
      <Authenticate>
        <Switch>
          <Route exact path="/signOut" component={SingOut}/>
          <Route exact path="/ranking" component={Ranking}/>
          <Route exact path="/exam" component={ExamTake}/>
          <Route exact path="/exam/:id" component={CreateExamTake}/>
          <Route exact path="/exam/complete" component={CreateExam}/>
          <AdminCheck>
            <Switch>
              <Route exact path="/admin/exam_category" component={ExamCategory}/>
              <Route exact path="/admin/exam_category/create" component={CreateExamCategory}/>
              <Route exact path="/admin/exam_category/:id" component={EditExamCategory}/>
              <Route exact path="/admin/exam" component={Exam}/>
              <Route exact path="/admin/exam/create" component={CreateExam}/>
              <Route exact path="/admin/exam/:id" component={EditExam}/>
              <Route exact path="/admin/user" component={User}/>
              <Redirect from="/" to="/ranking"/>
            </Switch>
          </AdminCheck>
          <Redirect from="/" to="/ranking"/>
        </Switch>
      </Authenticate>
    </Switch>
  </App>
)
