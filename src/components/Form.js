import React, {Component} from 'react'
import {Button, TextField} from "@material-ui/core"

import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {withAxios} from "./NetWrapper"
import * as actionAuth from "../actions/actionAuth"
import {bindActionCreators} from 'redux'
import Message from "./Message"

class Form extends Component {
  constructor(props) {
    super(props)

    this.actions = bindActionCreators(actionAuth, this.props.dispatch)
  }

  static propTypes = {
    name: PropTypes.string,
    submitTitle: PropTypes.string,
    url: PropTypes.string,
    onResponse: PropTypes.func,
  }

  getFormData = () => {
    const {email, password} = this.props.rAuth[this.props.name]

    return {email, password}
  }

  sendData = async () => {
    this.actions.clearErrors({form: this.props.name})

    const response = await this.props.request('post', this.props.url, this.getFormData())

    if (response.error) {
      this.actions.setError({
        form: this.props.name,
        message: response.error
      })
    }

    this.props.onResponse(response)
  }

  render() {
    const {changeFormValue} = this.actions
    const {error} = this.props.rAuth[this.props.name]

    return (
      <div role={'form'} className={'form'}>
        <TextField
          label='E-mail'
          defaultValue={'eve.holt@reqres.in'}
          onChange={
            ({target}) => {
              changeFormValue({
                form: this.props.name,
                field: 'email',
                value: target.value
              })
            }
          }/>

        <TextField
          label='Password'
          type={'password'}
          onChange={
            ({target}) => {
              changeFormValue({
                form: this.props.name,
                field: 'password',
                value: target.value
              })
            }
          }/>

        <Button
          variant='contained'
          color='primary'
          onClick={this.sendData}
        >
          {this.props.submitTitle}
        </Button>

        {
          !error ? null :
            <Message
              type={'error'}
              message={error}
              onClose={() => {this.actions.clearErrors({form: this.props.name})}}
            />
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({rAuth: state.rAuth})

export default connect(mapStateToProps)(withAxios(Form))
