import TableSortColumn from './src/SortColumn'

TableSortColumn.install = function install(Vue) {
  Vue.component(TableSortColumn.name, TableSortColumn)
}

export default TableSortColumn
