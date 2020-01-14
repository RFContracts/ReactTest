import React, {Component} from "react"

export default class TabPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {children, value, index, ...other} = this.props

    return (
      <div
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}
      >
        <div className={'auth__wrapper'}>
          {children}
        </div>
      </div>
    )
  }
}
