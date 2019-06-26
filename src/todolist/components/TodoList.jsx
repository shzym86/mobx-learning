import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import TodoHeader from './TodoHeader'
import TodoView from './TodoView'
import TodoFooter from './TodoFooter'
import { trace } from 'mobx'

// 为 React 组件装饰 observer 之后，所有可被观察的对象的值改变后都会重新渲染视图
@observer
class TodoList extends Component {
  // 传入的 store 是一个类实例对象，只有一个属性为 todos 数组，它的每个元素都是一个 Todo 类实例对象，它们都是可被观察的对象
  static propTypes = {
    store: PropTypes.shape({
      todos: PropTypes.arrayOf(PropTypes.object),
      createTodo: PropTypes.func,
      unfinishedCount: PropTypes.number
    }).isRequired
  }

  render() {
    trace()   // mobx 提供的追踪组件是否被渲染的方法，用于开发环境的调试
    const { store } = this.props
    return (
      // 内部的组件需要把整个 store 传进去，然后在子组件中取出数据，这样就不会造成父组件的重新渲染。
      // 如果在当前的 TodoList 中将数据取出来再传到子组件，那么一旦数据改变，当前组件也会被重新渲染，这是没有意义的。 
      <div className="todo-list">
        <TodoHeader store={store} />
        <TodoView store={store} />
        <TodoFooter store={store} />
        {/* 不能写成 <TodoFooter count={store.unfinishedCount} /> 这样写则是在当前组件取出可观察的数据，
        导致 unfinishedCount 计算属性值改变后，TodoFooter 重新渲染，TodoList 也会被重新渲染，
        传入整个 store 则在 TodoFooter 中取出 unfinishedCount 的值，这样一来 TodoList 就不会被重新渲染。 */}
      </div>
    )
  }
}

export default TodoList