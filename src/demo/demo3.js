import { observable, reaction, action, runInAction } from 'mobx'

export default () => {

  class Store {
    @observable array = []
    @observable obj = {}
    @observable map = new Map()
    @observable string = "hello"
    @observable number = 20
    @observable bool = false

    // 在 mobx 中要修改可观察的数据必须通过 action 实现，不要随意赋值更改（很像 React 的 setState）
    // 通过 @action 装饰器声明的方法，在里面无论修改不同数据不同次数，都只触发一次 reaction 执行
    @action modify() {
      this.string = "goodbye"
      this.number = 18
    }
  }

  const store = new Store()

  reaction(() => [store.string, store.number], arr => console.log("reaction: " + arr.join('-')))

  // 1. 每次修改数据都会触发 reaction 执行，有时候希望合并所有修改值更新一次状态
  // store.string = "goodbye"
  // store.number = 18

  // 2. 调用 @action 声明的 modify 方法来修改数据触发 reaction 执行
  store.modify()

  // 3. 对于需要重复调用的方法，在 class 中为预先定义的方法绑定 @action 装饰器。
  // 如果只是运行一次的任务，可以直接调用 mobx 的 runInAction，传入匿名函数来修改状态，同样只执行一次 reaction。
  runInAction(() => {
    store.string = "goodnight"
    store.number = 50
  })
}