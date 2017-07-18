import {bindActionCreators} from 'redux'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Header from '../components/molecules/header/'
import Sidebar from '../components/atoms/sidebar/'
import Breadcrumb from '../components/molecules/breadcrumb/'
import Aside from '../components/atoms/aside/'
import Footer from '../components/atoms/footer/'

class App extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header/>
          <div className="app-body">
            <Sidebar {...this.props}/>
            <main className="main">
              <Breadcrumb/>
              <div className="container-fluid">
                {this.props.children}
              </div>
            </main>
            <Aside/>
          </div>
          <Footer/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)