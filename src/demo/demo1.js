import { observable } from 'mobx'

export default () => {
  // 引用类型的数据可直接被观察：Array，Object，Map
  // 基本类型的数据需要用 observable.box 将其包装成可被观察的对象
  // 可观察对象的所有赋值都会被监听到

  let arr = observable(["a", "b", "c"])
  console.log(arr)

  let obj = observable({
    a: "foo",
    b: "bar"
  })
  console.log(obj)

  let map = observable(new Map())
  console.log(map)

  // 基本类型数据被包装之后，通过 get 方法获取原始值，通过 set 方法修改原始值
  // 说明：通过 @observable 定义的数据没有 get/set 方法，可以直接获取到原始值
  let string = observable.box("hello")
  console.log(string)

  let number = observable.box(20)
  console.log(number)
  number.set(50)
  console.log(number.get())
}


