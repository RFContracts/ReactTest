import React, {Component} from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {Cookies} from "react-cookie"
import {Switch, Route, Redirect} from 'react-router-dom'

import * as reducers from '../reducers'

import Header from '../components/Header'
import Auth from './Auth'
import Admin from './Admin'

import '../assets/scss/main.scss'
import {setUser} from "../actions/actionAuth"

const reducer = combineReducers(reducers)
const cookies = new Cookies()


export const store = createStore(reducer)

export default class App extends Component {
  constructor(props) {
    super(props)

    window.store = store.getState
  }

  render() {
    return (
      <Provider store={store}>
        <Header/>
        <Switch>
          <Route path='/login' component={Auth}/>
          <Route path='/' component={Admin}/>
          <Redirect to='/'/>
        </Switch>
      </Provider>
    )
  }
}
