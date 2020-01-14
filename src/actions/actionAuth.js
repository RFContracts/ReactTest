import * as types from '../constants/actionTypes'

export function changeFormValue({form, field, value}) {
  return {
    type: types.CHANGE_FORM_VALUE,
    form,
    field,
    value
  }
}

export function setError({form, message}) {
  return {
    type: types.SET_ERROR,
    form,
    message
  }
}

export function clearErrors({form}) {
  return {
    type: types.CLEAR_ERRORS,
    form
  }
}

export function setUser({status, name, email, avatar}) {
  return {
    type: types.SET_USER,
    status,
    name,
    email,
    avatar
  }
}
