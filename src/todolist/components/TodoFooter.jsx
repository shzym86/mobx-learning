import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { trace } from 'mobx'

@observer
class TodoFooter extends Component {

  render() {
    trace()
    const { store } = this.props
    return (
      <footer>
        {store.unfinishedCount} item(s) unfinished
      </footer>
    )
  }
}

export default TodoFooter