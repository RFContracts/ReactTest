import React, {Component} from 'react'
import PropTypes from "prop-types"

import UserItem from "../components/UserItem"
import EditForm from "../components/EditForm"
import Dialog from "../components/Dialog"
import InfiniteScroll from "react-infinite-scroller"
import {CircularProgress} from "@material-ui/core"

export default class UserTable extends Component {
  constructor(props) {
    super(props)

    this.scrollParentRef = React.createRef()

    this.state = {
      dialogIsOpen: false,
      dialogType: 'confirm',
      itemId: null
    }
  }

  static propTypes = {
    data: PropTypes.array,
    formData: PropTypes.object,
    status: PropTypes.string,
    error: PropTypes.string,
    hasMoreData: PropTypes.bool,
    request: PropTypes.func,
    deleteRecord: PropTypes.func,
    editRecord: PropTypes.func,
    changeFormValue: PropTypes.func,
    fetchUsers: PropTypes.func,
    setError: PropTypes.func
  }

  toggleDialog = (status, type, id) => {
    this.setState({
      dialogIsOpen: status,
      dialogType: type,
      itemId: id
    })
  }

  confirm = (id) => {
    switch(this.state.dialogType) {
      case 'confirm':
        this.deleteRecord(id)
        break
      case 'edit':
        this.editRecord(id)
        break
      default:
        break
    }
  }

  deleteRecord = async (id) => {
    const response = await this.props.request('delete', `/users/${id}`)

    if (response.error) {
      this.props.setError({error: response.error})
      return
    }

    this.props.deleteRecord({id})

    this.setState({
      dialogIsOpen: false
    })
  }

  editRecord = async (id) => {
    const data = {
      first_name: this.props.formData.firstName,
      last_name: this.props.formData.lastName,
      email: this.props.formData.email,
    }

    const response = await this.props.request('put', `/users/${id}`, data)

    if (response.error) {
      this.props.setError({error: response.error})
      return
    }

    this.props.editRecord({id, data})

    this.setState({
      dialogIsOpen: false
    })
  }

  renderTable = () => {
    return this.props.data.map(row => {
      return (
        <UserItem
          onDelete={(id) => {this.toggleDialog(true, 'confirm', id)}}
          onEdit={(id) => {this.toggleDialog(true, 'edit', id)}}
          data={row}
          key={row.id}
        />
      )
    })
  }

  renderDialogContent(id) {
    switch(this.state.dialogType) {
      case 'confirm':
        return <div>Are you sure you want to delete the entry?</div>
      case 'edit':
        return <EditForm
          changeFormValue={this.props.changeFormValue}
          data={this.props.data.find(row => row.id === id)}
        />
      default:
        return <div>confirm</div>
    }
  }

  renderHeader = () => {
    return (
      <>
        <div className={'user-item__header'}>Avatar</div>
        <div className={'user-item__header'}>Email</div>
        <div className={'user-item__header'}>Full name</div>
        <div className={'user-item__header'}>Action</div>
      </>
    )
  }

  renderLoader = () => {
    return (
      <div className={'user-item__loader'} key={0}>
        <CircularProgress key={1}/>
      </div>
    )

  }

  render() {
    return (
      <div
        ref={this.scrollParentRef}
        className={'user-table'}
      >
          <InfiniteScroll
            pageStart={0}
            loadMore={async (num) => {await this.props.fetchUsers(num)}}
            loader={this.renderLoader()}
            hasMore={this.props.hasMoreData}
            useWindow={false}
            threshold={1}
            getScrollParent={() => this.scrollParentRef.current}
            className={'users'}
          >
            {this.renderHeader()}
            {this.renderTable()}
          </InfiniteScroll>
        <Dialog
          title={this.state.dialogType === 'edit' ? 'Edit' : 'Сonfirmation'}
          error={this.props.error}
          clearError={() => {this.props.setError('')}}
          isOpen={this.state.dialogIsOpen}
          confirm={() => {this.confirm(this.state.itemId)}}
          cancel={() => {this.toggleDialog(false, this.state.dialogType, 1)}}
        >
          {this.renderDialogContent(this.state.itemId)}
        </Dialog>
      </div>
    )
  }
}
