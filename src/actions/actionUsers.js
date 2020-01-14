import * as types from '../constants/actionTypes'

export function addUsersData({data}) {
  return {
    type: types.ADD_DATA,
    data
  }
}

export function deleteUser({id}) {
  return {
    type: types.DELETE_RECORD,
    id
  }
}

export function changeFormValue({id, field, value}) {
  return {
    type: types.CHANGE_EDIT_FORM_VALUE,
    id,
    field,
    value
  }
}

export function clearUsersData() {
  return {
    type: types.CLEAR_DATA,
  }
}

export function setUsersFetchStatus({status}) {
  return {
    type: types.SET_STATUS,
    status
  }
}

export function changeUser({id, data}) {
  return {
    type: types.CHANGE_RECORD,
    id,
    data
  }
}

export function setHasMore({hasMore}) {
  return {
    type: types.HAS_MORE,
    hasMore
  }
}

export function setUsersError({error}) {
  return {
    type: types.SET_USERS_ERROR,
    error
  }
}
