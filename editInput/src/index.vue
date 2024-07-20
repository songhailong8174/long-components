<template>
  <div class="long-edit-input">
    <div v-if="!edit" class="flex al-center" style="gap: 5px;">
      <div>{{value}}</div>
      <i @click="setEdit" class="el-icon-edit el-button--text" style="cursor: pointer;"></i>
    </div>
    <div v-else class="flex al-center" style="gap: 5px;">
      <long-input
        v-model="iptValue"
        placeholder=""
        style="width: 100px;"
      />
      <el-button type="text" @click="onConfirm">确定</el-button>
      <el-button type="text" @click="cancelEdit">取消</el-button>
    </div>
  </div>
</template>
<script>
import validator from 'validator'
export default {
  name: 'LongEditInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: '0'
    },
    editable: {
      type: Boolean,
      default: false
    },
    beforeEdit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      edit: false,
      iptValue: ''
    }
  },
  watch: {
    editable: {
      immediate: true,
      handler(val) {
        this.edit = val
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.iptValue = val
      }
    }
  },
  methods: {
    setEdit() {
      if (this.beforeEdit) {
        this.beforeEdit().then(() => {
          this.edit = true
          this.$emit('edit')
        })
      } else {
        this.edit = true
        this.$emit('edit')
      }
    },
    cancelEdit() {
      this.edit = false
      this.iptValue = this.value
      this.$emit('cancel')
    },
    onConfirm() {
      if (!this.iptValue) {
        this.$message.warning('请输入排序')
        return
      }
      if (!validator.isNumeric(this.iptValue, {no_symbols: true})) {
        this.$message.warning('请输入正确的数字')
        return
      }
      this.$emit('confirm', this.iptValue)
      // this.$emit('input', this.iptValue)
      // this.cancelEdit()
    }
  }
}
</script>
<style lang="scss" scoped>
.long-edit-input {
  .flex {
    display: flex;
  }
  .al-center {
    align-items: center;
  }
}
</style>
