<template>
  <long-input placeholder="请输入验证码" :maxlength="maxLength" v-model="code" @input="updateValue">
    <template #append>
      <el-button type="primary" @click="getCaptcha">{{btnText}}</el-button>
    </template>
  </long-input>
</template>
<script>
import { isMobile } from '@/utils/validate'
export default {
  name: 'LongValidCode',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 6
    },
    api: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      btnText: '获取验证码',
      timer: null,
      maxTime: 60,
      btnDisabled: false,
      code: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.code = val || ''
      }
    }
  },
  methods: {
    updateValue(val) {
      this.$emit('input', val)
    },
    $start() {
      if (this.btnDisabled || !this.mobile) return
      this.btnDisabled = true
    },
    $end() {
      this.btnText = '获取验证码'
      clearInterval(this.timer)
      this.btnDisabled = false
      this.maxTime = 60
    },
    $reset() {

    },
    getCaptcha() {
      if (!isMobile(this.mobile)) {
        this.$message.warning('请输入正确的手机号')
        return
      }
      if (this.btnDisabled || !this.mobile) return
      this.btnDisabled = true
      // this.$emit('start')
      this.api({ phone: this.mobile }).then((res) => {
        if (res.code === 200) {
          this.timer = setInterval(() => {
            if (this.maxTime <= 0) {
              this.btnText = '获取验证码'
              this.clearTimer()
              this.btnDisabled = false
              this.maxTime = 60
              this.$emit('end')
              return
            }
            this.maxTime --
            this.btnText = `${this.maxTime}s重新获取`
          }, 1000)
        }
      }).catch(() => {
        this.maxTime = 60
        this.btnDisabled = true
      })
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>
<style lang="scss" scoped>

</style>
