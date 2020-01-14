import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom"

import {withAxios} from "../components/NetWrapper"

import * as actionAuth from '../actions/actionAuth'

import {
  Grid,
  Tabs,
  Tab,
  Card,
} from '@material-ui/core'

import Form from "../components/Form"
import TabPanel from "../components/TabPanel"

class Auth extends Component {
  constructor(props) {
    super(props)

    this.actions = bindActionCreators(actionAuth, this.props.dispatch)

    this.state = {
      activeTab: 0,
      redirect: this.props.cookies.get('token') && this.props.cookies.get('id')
    }
  }

  setUser = async (id) => {
    const response = await this.props.request('get', `/users/${id}`)

    const {data} = response.data

    this.actions.setUser({
      status: true,
      name: data.first_name + ' ' + data.last_name,
      email: data.email,
      avatar: data.avatar,
    })
  }

  onLogin = (response) => {
    if (response.error) {
      return
    }

    this.props.cookies.set('token', response.data.token)
    this.props.cookies.set('id', 2)

    this.setUser(2)
  }

  onSignUp = (response) => {
    if (response.error) {
      return
    }

    this.props.cookies.set('token', response.data.token)
    this.props.cookies.set('id', response.data.id)

    this.setUser(response.data.id)
  }

  render() {
    const {activeTab} = this.state

    const handleChange = (event, newValue) => {
      this.setState({
        activeTab: newValue
      })
    }

    return (
      <div className={'auth'}>
        <Grid
          container
          direction='row'
          justify='center'
        >
          {this.props.rAuth.user.isLogin ? <Redirect to={'/'}/> :
            <Card raised={true}>
              <Tabs value={activeTab} onChange={handleChange}>
                <Tab label={'Log in'}/>
                <Tab label={'Sign up'}/>
              </Tabs>
              <TabPanel value={activeTab} index={0}>
                <Form
                  name={'login'}
                  submitTitle={'Log in'}
                  url={'/login'}
                  onResponse={this.onLogin}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <Form
                  name={'register'}
                  submitTitle={'Sign up'}
                  url={'/register'}
                  onResponse={this.onSignUp}
                />
              </TabPanel>
            </Card>
          }
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({rAuth: state.rAuth})

export default connect(mapStateToProps)(withAxios(Auth))


