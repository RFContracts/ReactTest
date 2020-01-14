import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {withAxios} from "../components/NetWrapper"

import {
  Avatar,
  IconButton,
} from '@material-ui/core'

import Exit from '@material-ui/icons/ExitToApp'
import * as actionAuth from "../actions/actionAuth"

class Header extends Component {
  constructor(props) {
    super(props)

    this.actions = bindActionCreators(actionAuth, this.props.dispatch)

    const isLogin = this.props.cookies.get('id') && this.props.cookies.get('token')

    if (isLogin) {
      this.actions.setUser({
        status: true,
        name: '',
        email: '',
        avatar: '',
      })

      this.setUser(this.props.cookies.get('id'))
    }

  }

  logout = () => {
    this.props.cookies.remove('token')
    this.props.cookies.remove('id')

    this.actions.setUser({
      status: false,
      name: '',
      email: '',
      avatar: '',
    })
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

  render() {
    const {name, email, avatar, isLogin} = this.props.rAuth.user

    return (
      <header className={'app-header'}>
        {
          !isLogin ? null :
            <div className={'app-header__user-container'}>
              <span className={'app-header__name'}>{name}</span>
              <span className={'app-header__email'}>{email}</span>

              <Avatar className={'app-header__avatar'} src={avatar}/>
              <IconButton
                className={'app-header__exit'}
                onClick={this.logout}
              >
                <Exit/>
              </IconButton>
            </div>
        }
      </header>
    )
  }
}


const mapStateToProps = state => ({rAuth: state.rAuth})

export default connect(mapStateToProps)(withAxios(Header))
