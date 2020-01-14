import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'

import {IconButton} from "@material-ui/core"



export default class Message extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    type: PropTypes.oneOf(['error', 'info']),
    message: PropTypes.string,
    onClose: PropTypes.func
  }

  render() {
    return (
      <div className={`message message--${this.props.type}`}>
        {
          this.props.type === 'error'
            ? <ErrorIcon className={'message__icon'}/>
            : <InfoIcon className={'message__icon'}/>
        }
        <div className="message__text">{this.props.message}</div>
        <IconButton
          className={'message__button'}
          onClick={this.props.onClose}
        >
          <CloseIcon/>
        </IconButton>
      </div>
    )
  }
}
