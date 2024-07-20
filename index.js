import Button from './button'
import Input from './input'
import Select from './select'
import Dialog from './dialog'
import MenuSelector from './menuSelector'
import Pagination from './pagination'
import Table from './table'
import ValidCode from './phoneCode'
import TableStatusColumn from './table/src/columns'
import TableSortColumn from './table/src/columns/sortColumn'
import TableImageColumn from './table/src/columns/imageColumn'
import EditInput from './editInput'
import TimeSelector from './timeSelector'
import ScanInput from './scanInput'

const components = [
  Button,
  Input,
  EditInput,
  Select,
  Dialog,
  MenuSelector,
  Pagination,
  Table,
  TableStatusColumn,
  TableSortColumn,
  TableImageColumn,
  ValidCode,
  TimeSelector,
  ScanInput
]

const install = function install(Vue) {
  if (install.installed) {
    return
  }
  components.map((component) => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
