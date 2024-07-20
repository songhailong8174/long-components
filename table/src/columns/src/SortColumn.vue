<template>
  <el-table-column v-bind="$attrs" :prop="fieldKey">
    <template slot-scope="scope">
      <long-edit-input v-model="scope.row[fieldKey]" :editable="index === scope.$index" :beforeEdit="beforeEdit" @edit="() => $emit('edit', scope.$index)" @confirm="(val) => triggerEvent(val, scope.row)" @cancel="() => $emit('edit', -1)" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'LongTableSortColumn',
  props: {
    fieldKey: {
      type: String,
      default: 'sort'
    },
    beforeEdit: {
      type: Function,
      default: null
    },
    index: {
      type: Number,
      default: -1
    }
  },
  methods: {
    triggerEvent(value, row) {
      this.$emit('confirm', row, value)
    },
    getFieldKey() {
      return this.fieldKey || 'sort'
    }
  }
}
</script>
