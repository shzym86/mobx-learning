import React, { Component } from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

export default () => {

  class Store {
    @observable list = ["吃饭", "睡觉", "打游戏"]
    // .bound 是将方法中的 this 作用域强制绑定到当前对象上
    @action.bound addItem() {
      this.list.push("上班")
    }
  }

  // 给需要根据依赖数据进行重渲染的视图组件修饰（一般来说全部修饰也可以）
  @observer
  class TodoList extends Component {
    // 使用 class 的 propTypes 属性来规定传参的数据类型
    // 注：类属性用 static 声明，实例属性写在 constructor 里面
    static propTypes = {
      list: PropTypes.array
    }

    render() {
      // 在最新版 mobx 中，observable 包装的数组是一个 Proxy，它也是 Array 类型
      // console.log(this.props.list instanceof Array)  // true
      const { list, addItem } = this.props
      return (
        <div>
          <div>
            <input type="text" />
            <button onClick={addItem}>Add</button>
          </div>
          <ul>
            {
              list.map((item, index) => {
                return <TodoItem item={item} key={index} />
              })
            }
          </ul>
        </div>
      )
    }
  }

  @observer
  class TodoItem extends Component {

    static propTypes = {
      item: PropTypes.string
    }

    render() {
      const { item } = this.props
      return (
        <li>{item}</li>
      )
    }
  }


  const store = new Store()

  ReactDOM.render(
    <TodoList list={store.list} addItem={store.addItem} />,
    document.querySelector("#root")
  )
}