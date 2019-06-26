import { observable, computed, autorun, when, reaction } from 'mobx'

// 观察数据变化的方式有四种：computed, autorun, when, Reaction
export default () => {

  class Store {
    // 通常使用 @observable 装饰器来将数据包装成可观察的对象
    // 而不是使用 observable() 或 observable.box() 方法
    @observable array = []
    @observable obj = {}
    @observable map = new Map()
    @observable string = "hello"
    @observable number = 20
    @observable bool = false

    // (1)
    // computed 将多个可观察数据组合成一个可观察数据
    // 当依赖的可观察数据改变后，会同步影响计算属性的值
    @computed get mixed() {
      return `${this.string}-${this.number}`
    }
  }

  // 实例化
  const store = new Store()

  // (2)
  // autorun 自动追踪可观察数据，用于监听到可观察数据的变化之后自动处理一些逻辑
  // 只有 autorun 中引用的数据（包括它们的依赖）变化了，autorun 函数才会被触发
  autorun(() => console.log("autorun: " + store.mixed))
  // 修改可观察的数据，触发 autorun 来生成一定的副作用
  store.string = "world"
  store.number = 30

  // (3)
  // when 先计算第一个参数传入的条件函数返回值（Boolean），只有为真才会去执行第二个参数传递的函数
  // 注意条件函数中只能包含可观察的数据，不能使普通变量，否则即使满足条件函数的返回值，也不会作出反应
  when(() => store.bool, () => console.log("when: " + store.bool))
  // 修改可观察的数据使其满足条件函数
  store.bool = true

  // (4) 
  // 无论是否修改可观察数据，autorun 在数据初始化的时候会先行执行一次，产生副作用，
  // 这是因为 mobx 需要知道哪些数据是需要监听的，从而在它们变化时作出响应
  //
  // reaction 可以让我们主动告知 mobx 哪些数据是需要监听的，而不是由 autorun 主动去获悉，以免在初始化数据时就执行 autorun 而产生副作用
  // reaction 可以替代 autorun 的作用，根据业务场景决定使用哪一个 API
  // 第一个参数函数返回一个数组，包括指定需要监听的可观察数据，在数据初始化时被执行，告诉 mobx 要监听哪些数据
  // 第二个参数函数的参数就是前面指定的数组，当数组的值发生变化时，就会执行其中的逻辑
  reaction(() => [store.string, store.number], arr => console.log("reaction: " + arr.join('-')))
  // 修改可观察的数据，触发 reaction 来生成一定的副作用
  store.string = "goodbye"
  store.number = 18
}