import React, { Component } from 'react'
import { observer } from 'mobx-react'
import TodoItem from './TodoItem'

@observer
class TodoView extends Component {

  handleDelete = (todo) => {
    const { store } = this.props
    store.removeTodo(todo)
  }

  render() {
    const { store } = this.props
    return (
      <ul className="todo-view">
        {
          // 数组映射，并对其中的每个对象进行参数解构
          store.todos.map(todo => {
            return (
              <li key={todo.id} className="todo-item">
                <TodoItem todo={todo} />
                <span onClick={() => this.handleDelete(todo)} className="delete">&times;</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default TodoView