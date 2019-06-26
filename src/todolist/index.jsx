import React from 'react'
import ReactDOM from 'react-dom'
import Store from './store'
import TodoList from './components/TodoList'
import './app.css'

const store = new Store()

ReactDOM.render(
  <TodoList store={store} />,
  document.querySelector("#root")
)