import React, { Component } from 'react'
import TodoList from './src/screens/TodoList'

import Navigator from './src/config/routes'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './src/actions'

import ES from 'react-native-extended-stylesheet'

ES.build({
  $lightblue: '#32c2f0',
  $logocolor: '#fff'
})


const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Navigator)
export default App
