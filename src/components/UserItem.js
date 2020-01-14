import React, {Component} from 'react'
import {Avatar, IconButton} from "@material-ui/core"

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import PropTypes from "prop-types"

export default class UserItem extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
  }

  render() {
    const {id, first_name, last_name, email, avatar} = this.props.data

    return (
      <>
        <Avatar
          className={'user-item__avatar'}
          src={avatar}
        />

        <div className={'user-item__email'}>
          <a href={`mailto: ${email}`}>
            {email}
          </a>
        </div>
        <div className={'user-item__name'}>{first_name} {last_name}</div>

        <ul className={'user-item__actions'}>
          <li className={'user-item__action'}>
            <IconButton
              className={'user-item__button'}
              onClick={() => {
                this.props.onEdit(id)
              }}
            >
              <Edit/>
            </IconButton>
          </li>
          <li className={'user-item__action'}>
            <IconButton
              className={'user-item__button'}
              onClick={() => {
                this.props.onDelete(id)
              }}
            >
              <Delete/>
            </IconButton>
          </li>
        </ul>
      </>
    )
  }
}
