import * as types from '../constants/actionTypes'

const initialState = {
  login: {
    email: '',
    password: '',
    error: ''
  },

  register: {
    email: '',
    password: '',
    error: ''
  },

  user: {
    isLogin: false,
    name: 'Guest',
    email: '',
    avatar: '',
  }
}

export default function table(state = initialState, action) {
  let _state = {...state}

  switch (action.type) {
    case types.SET_USER:
      _state.user.isLogin = action.status
      _state.user.name = action.name
      _state.user.email = action.email
      _state.user.avatar = action.avatar

      return _state

    case types.CHANGE_FORM_VALUE:
      _state[action.form][action.field] = action.value
      return _state

    case types.SET_ERROR:
      _state[action.form].error = action.message
      return _state

    case types.CLEAR_ERRORS:
      _state[action.form].error = ''
      return _state

    default:
      return state
  }
}
