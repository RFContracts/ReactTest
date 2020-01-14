import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withAxios} from "../components/NetWrapper"

import * as actionUsers from '../actions/actionUsers'

import {Grid} from "@material-ui/core"
import {Redirect} from "react-router"
import UserTable from "../components/UserTable"

class Admin extends Component {
  constructor(props) {
    super(props)

    this.actions = {
      ...bindActionCreators(actionUsers, this.props.dispatch)
    }
  }

  fetchUsers = async (num = 1) => {
    if (!this.props.rUsers.hasMore) {
      return
    }

    const response = await this.props.request('get', `/users?page=${num}`)

    if (response.error) {
      return []
    }

    if (response.data.data.length === 0) {
      this.actions.setHasMore({hasMore: false})
    }

    this.actions.addUsersData({data: response.data.data})
  }

  render() {
    return (
      <div>
        {!this.props.rAuth.user.isLogin ?
          <Redirect to={'/login'}/> :
          <Grid
            container
            direction='row'
            justify='center'
            className={'auth'}
          >
            <UserTable
              data={this.props.rUsers.users}
              fetchUsers={this.fetchUsers}
              formData={this.props.rUsers.form}
              status={this.props.rUsers.status}
              request={this.props.request}
              deleteRecord={this.actions.deleteUser}
              editRecord={this.actions.changeUser}
              changeFormValue={this.actions.changeFormValue}
              hasMoreData={this.props.rUsers.hasMore}
              setError={this.actions.setUsersError}
              error={this.props.rUsers.error}
            />
          </Grid>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rAuth: state.rAuth,
  rUsers: state.rUsers
})

export default connect(mapStateToProps)(withAxios(Admin))
