// 获取要添加的组件
import Toast from './Toast.vue'

const obj = {};

obj.install = function (Vue) {
  // console.log(Toast.$el);
  // 1.创建一个组件构造器即一个Vue对象
  const toastContrustor = Vue.extend(Toast)
  // 2.实例化组件(Vue对象),使其变为一个Vue的实例
  const toast = new toastContrustor()
  console.log(toast);
  // 3.将某一个元素,手动挂载到组件对象上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast


}

export default obj;