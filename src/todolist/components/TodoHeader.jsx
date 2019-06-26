import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class TodoHeader extends Component {

  state = {
    inputValue: ""
  }

  handleClick = () => {
    const { store } = this.props
    const { inputValue } = this.state
    if (inputValue !== "") {
      store.createTodo(inputValue)
      this.setState({ inputValue: "" })
    }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const { inputValue } = this.state
    return (
      <header className="todo-header">
        <input className="input" type="text" onChange={this.handleChange} value={inputValue} />
        <button onClick={this.handleClick} className="btn">ADD</button>
      </header>
    )
  }
}

export default TodoHeader