import React, {Component} from 'react'
import {TextField} from "@material-ui/core"

import PropTypes from 'prop-types'

import Message from "./Message"

export default class EditForm extends Component {
  constructor(props) {
    super(props)
    this.setFormData()
  }

  static propTypes = {
    changeFormValue: PropTypes.func,
    data: PropTypes.object
  }

  setFormData = () => {
    this.props.changeFormValue({
      field: 'email',
      value: this.props.data['email']
    })

    this.props.changeFormValue({
      field: 'firstName',
      value: this.props.data['first_name']
    })

    this.props.changeFormValue({
      field: 'lastName',
      value: this.props.data['last_name']
    })

  }

  render() {
    const {changeFormValue} = this.props

    return (
      <div role={'form'} className={'form-edit'}>
        <TextField
          label='E-mail'
          defaultValue={this.props.data['email']}
          onChange={
            ({target}) => {
              changeFormValue({
                field: 'email',
                value: target.value
              })
            }
          }/>

        <TextField
          label='First name'
          defaultValue={this.props.data['first_name']}
          onChange={
            ({target}) => {
              changeFormValue({
                field: 'firstName',
                value: target.value
              })
            }
          }/>

        <TextField
          label='Last name'
          defaultValue={this.props.data['last_name']}
          onChange={
            ({target}) => {
              changeFormValue({
                field: 'lastName',
                value: target.value
              })
            }
          }/>

      </div>
    )
  }
}
