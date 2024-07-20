<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <slot name="unshift" />
    <slot slot="default">
      <el-option v-for="(item, index) in options" :key="index" :value="item[valueKey]" :label="item[labelKey]" :disabled="item[disabledOption]" />
    </slot>
    <slot slot="prefix" name="prefix" />
    <slot slot="empty" name="empty" />
  </el-select>
</template>

<script>
export default {
  name: 'LongSelect',
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    disabledOption: {
      type: [Boolean, Number],
      default: false
    },
    valueKey: {
      type: [String, Number],
      default: ''
    },
    labelKey: {
      type: [String, Number],
      default: ''
    },
    mode: {
      type: String,
      default: 'local'
    },
    url: {
      type: String,
      default: ''
    },
    requestParams: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      options: []
    }
  },
  watch: {
    dataList: {
      deep: true,
      immediate: true,
      handler(val) {
        if (this.mode === 'local') {
          this.options = val
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.mode === 'remote' && this.url) {
        this.$request(this.url, this.requestParams).then((res) => {
          this.options = res || []
        })
      }
    }
  }
}
</script>

<style>
</style>
