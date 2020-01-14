import React, {Component} from 'react'
import {Button, Dialog, DialogTitle} from "@material-ui/core"

import PropTypes from "prop-types"
import Message from "./Message"

export default class CustomDialog extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    confirm: PropTypes.func,
    cancel: PropTypes.func,
    clearError: PropTypes.func,
    error: PropTypes.string,
    title: PropTypes.string
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        className={'dialog'}
        onExited={this.props.clearError}
      >
        <DialogTitle>{this.props.title}</DialogTitle>

        <div className={'dialog__content'}>
          {this.props.children}
        </div>

        <div className={'dialog__actions'}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {this.props.confirm()}}
          >
            Confirm
          </Button>

          <Button
            variant='contained'
            color='secondary'
            onClick={() => {this.props.cancel()}}
          >
            Cancel
          </Button>
        </div>

        {
          !this.props.error ? null :
            <Message
              type={'error'}
              message={this.props.error}
              onClose={() => {this.props.clearError()}}
            />
        }
      </Dialog>
    )
  }
}
