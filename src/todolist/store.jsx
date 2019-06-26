import { observable, action, computed } from 'mobx'

// state
class Store {
  @observable todos = []

  @action.bound createTodo(title) {
    this.todos.push(new Todo(title))
  }

  @action.bound removeTodo(todo) {
    // observable 对象特有的 remove 方法，不是原生数组的方法
    this.todos.remove(todo)
  }

  @computed get unfinishedCount() {
    return this.todos.filter(todo => !todo.finished).length
  }
}

// todo 数据结构（包含了一些特有的属性，所以不能用 String 表示）
class Todo {
  id = Math.random()
  @observable title = ""
  @observable finished = false

  @action.bound toogle() {
    this.finished = !this.finished
  }

  constructor(title) {
    this.title = title
  }
}

export default Store