import * as types from '../constants/actionTypes'

const initialState = {
  users: [],
  status: '',
  form: {
    email: '',
    firstName: '',
    lastName: ''
  },
  hasMore: true,
  error: ''
}

export default function table(state = initialState, action) {
  let _state = {...state}, rowIndex

  switch (action.type) {
    case types.ADD_DATA:
      _state.users = [..._state.users, ...action.data]
      return _state

    case types.DELETE_RECORD:
      _state.users = _state.users.filter(row => row.id !== action.id)
      return _state

    case types.CLEAR_DATA:
      _state.users = []
      return _state

    case types.SET_STATUS:
      _state.status = action.status
      return _state

    case types.CHANGE_EDIT_FORM_VALUE:
      _state.form[action.field] = action.value
      return _state

    case types.CHANGE_RECORD:
      rowIndex = _state.users.findIndex(row => row.id === action.id)
      _state.users[rowIndex] = {..._state.users[rowIndex], ...action.data}
      return _state

    case types.HAS_MORE:
      _state.hasMore = action.hasMore
      return _state

    case types.SET_USERS_ERROR:
      _state.error = action.error
      return _state

    default:
      return state
  }
}
