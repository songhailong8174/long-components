<template>
  <el-table-column v-bind="$attrs" :prop="fieldKey">
    <template slot-scope="scope">
      <el-switch v-model="scope.row.status" :active-value="'0'" :inactive-value="'1'"  @change="checkConfirm(scope.row)" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'LongTableStatusColumn',
  props: {
    confirmConfig: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '温馨提示',
          content: '确定要禁用该状态吗?'
        }
      }
    },
    fieldKey: {
      type: String,
      default: 'status'
    }
  },
  methods: {
    checkConfirm(row) {
      if (this.confirmConfig.show) {
        this.changeStatus(row)
      } else {
        this.triggerEvent(row)
      }
    },
    triggerEvent(row) {
      this.$emit('confirm', row)
    },
    getFieldKey() {
      return this.fieldKey || 'status'
    },
    changeStatus(row) {
      if (row[this.getFieldKey()] == '1') {
        this.$confirm(this.confirmConfig.content, this.confirmConfig.title).then(() => {
          this.triggerEvent(row)
        }).catch(() => {
          row[this.getFieldKey()] = '0'
        })
      } else {
        this.triggerEvent(row)
      }
    }
  }
}
</script>
