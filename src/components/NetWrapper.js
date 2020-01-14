import axios from 'axios'
import {withCookies, Cookies} from 'react-cookie'
import React, {Component} from 'react'

import "regenerator-runtime/runtime"

const cookies = new Cookies()
const instance = axios.create({
  baseURL: 'https://reqres.in/api',
})

export function withAxios(WrappedComponent) {
  return withCookies(class extends Component {
    constructor(props) {
      super(props)
    }

    async request(method, url, data = null) {
      let response

      try {
        response = await instance({
          data,
          url: url,
          method: method,
          headers: {
            Authorization: cookies.get('token')
          }
        })
      } catch (error) {
        console.error(url, error)

        if (error.response && error.response.data.error) {
          response = error.response.data
        } else {
          response = {error: 'Server error'}
        }
      }

      return response

    }

    render() {
      return <WrappedComponent
        axios={instance}
        request={this.request}
        {...this.props}
      />
    }
  })
}

