import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { trace } from 'mobx'

@observer
class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    }).isRequired
  }

  handleChange = () => {
    const { todo } = this.props
    todo.toogle()
  }

  render() {
    trace()
    const { todo } = this.props
    return (
      <Fragment>
        <input className="toogle" type="checkbox" checked={todo.finished} onChange={this.handleChange} />
        <span className={["title", todo.finished && "finished"].join(" ")}>{todo.title}</span>
      </Fragment>
    )
  }
}

export default TodoItem