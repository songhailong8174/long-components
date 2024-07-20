import Pagination from './src/index.vue'

Pagination.install = function install(Vue) {
  Vue.component(Pagination.name, Pagination)
}

export default Pagination
