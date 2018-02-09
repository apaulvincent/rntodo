import React, { Component } from 'react'
import Main from './src/components/Main'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './src/actions'

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)
export default App
